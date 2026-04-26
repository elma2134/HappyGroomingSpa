import { useEffect, useState } from "react";

export default function Admin() {
  const [orders,setOrders]=useState([]);

  const load = ()=>{
    fetch("http://localhost:3000/orders",{
      headers:{
        authorization: localStorage.getItem("token")
      }
    })
    .then(r=>r.json())
    .then(setOrders);
  };

  useEffect(()=>{ load(); },[]);

  const del = async(id)=>{
    await fetch(`http://localhost:3000/orders/${id}`,{
      method:"DELETE",
      headers:{
        authorization: localStorage.getItem("token")
      }
    });
    load();
  };

  return (
    <div className="p-6">
      <h1>Admin</h1>
      {orders.map(o=>(
        <div key={o._id}>
          {o.date} {o.time}
          <button onClick={()=>del(o._id)}>ลบ</button>
        </div>
      ))}
    </div>
  );
}