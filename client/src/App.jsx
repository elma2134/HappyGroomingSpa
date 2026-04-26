import { useState } from "react";
import PetForm from "./components/PetForm";
import ServiceList from "./components/ServiceList";
import Cart from "./components/Cart";
import BookingPopup from "./components/BookingPopup";

function App() {

  const services = [
    { id: 1, name: "อาบน้ำ", prices: { S:150,M:250,L:350 }},
    { id: 2, name: "อาบน้ำ+ตัดขน", prices: { S:300,M:400,L:500 }},
    { id: 3, name: "อาบน้ำ+ไถขน", prices: { S:500,M:700,L:900 }},
  ];

  const timeSlots = ["10:00","11:00","12:00","13:00"];

  const breeds = {
    dog: [{ name:"ทั่วไป", extra:0 }],
    cat: [{ name:"ขนยาว", extra:100 }]
  };

  const [size,setSize]=useState("");
  const [petType,setPetType]=useState("");
  const [breed,setBreed]=useState("");
  const [cart,setCart]=useState([]);
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [orders,setOrders]=useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const getFinalPrice = (service)=>{
    const extra = breeds[petType]?.find(b=>b.name===breed)?.extra || 0;
    return service.prices[size] + extra;
  };

  const addToCart = (service)=>{
    if(!size || !petType || !breed){
      return alert("กรุณาเลือกข้อมูลให้ครบ");
    }

    setCart([
      ...cart,
      {
        name:service.name,
        size,petType,breed,
        price:getFinalPrice(service)
      }
    ]);
  };

  const total = cart.reduce((s,i)=>s+i.price,0);

  const loadOrders=(d)=>{
    fetch("http://localhost:3000/orders/public")
      .then(r=>r.json())
      .then(data=>setOrders(data.filter(o=>o.date===d)));
  };

  const booking=async ()=>{
    if (!date || !time) {
      return alert("กรุณาเลือกวันและเวลา");
    }

    const res = await fetch("http://localhost:3000/orders/public",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({services:cart,date,time,total})
    });

    const data = await res.json();

    if(!res.ok){
      alert(data.message);
      return;
    }

    alert("จองสำเร็จ 🎉");

    setCart([]);
    setTime("");
    setDate("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">

      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-pink-500">
          🐶 Happy Grooming Spa
        </h1>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        <PetForm
          size={size} setSize={setSize}
          petType={petType} setPetType={setPetType}
          breed={breed} setBreed={setBreed}
          breeds={breeds}
        />

        <ServiceList
          services={services}
          size={size}
          petType={petType}
          breed={breed}
          breeds={breeds}
          addToCart={addToCart}
          getFinalPrice={getFinalPrice}
        />

        <Cart
          cart={cart}
          total={total}
          timeSlots={timeSlots}
          orders={orders}
          date={date}
          setDate={setDate}
          setTime={setTime}
          time={time}
          loadOrders={loadOrders}
          setShowPopup={setShowPopup}
        />

      </div>

      {showPopup && (
        <BookingPopup
          cart={cart}
          total={total}
          onClose={() => setShowPopup(false)}
          onConfirm={() => {
            booking();
            setShowPopup(false);
          }}
        />
      )}

    </div>
  );
}

export default App;