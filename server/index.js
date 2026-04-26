const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Order = require("./models/Order");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "mysecret";
const PORT = process.env.PORT || 3000;

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Login ผิด ❌" });
  }
});

/* ================= AUTH ================= */
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("No token");

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send("Token invalid");
  }
}

/* ================= PUBLIC ================= */
app.post("/orders/public", async (req, res) => {
  try {
    const { date, time } = req.body;

    const exist = await Order.findOne({ date, time });

    if (exist) {
      return res.status(400).json({
        message: "❌ เวลานี้ถูกจองแล้ว"
      });
    }

    const order = new Order(req.body);
    await order.save();

    res.json({ message: "จองสำเร็จ 🎉" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/orders/public", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

/* ================= ADMIN ================= */
app.get("/orders", auth, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.delete("/orders/:id", auth, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "ลบสำเร็จ" });
});

/* ================= DB CONNECT ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("❌ DB ERROR:", err);
  });