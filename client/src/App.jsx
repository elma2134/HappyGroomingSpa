import { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const booking = async () => {
    try {
      const res = await fetch("https://happygroomingspa.onrender.com/orders/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, time }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
      } else {
        alert("จองสำเร็จ 🎉");
      }
    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🐶 Pet Grooming Booking</h1>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
      />
      <br /><br />

      <button onClick={booking}>จองคิว</button>
    </div>
  );
}

export default App;