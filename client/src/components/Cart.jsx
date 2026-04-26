function Cart({cart,total,timeSlots,orders,date,setDate,setTime,time,loadOrders,setShowPopup}) {
  return (
    <div>
      <h2>ตะกร้า</h2>

      {cart.map((i,index)=>(
        <div key={index}>{i.name} - {i.price}</div>
      ))}

      <p>รวม {total}</p>

      <input type="date" onChange={(e)=>{
        setDate(e.target.value);
        loadOrders(e.target.value);
      }}/>

      {timeSlots.map(t=>{
        const booked = orders.find(o=>o.time===t);
        return (
          <button key={t} disabled={booked} onClick={()=>setTime(t)}>
            {t}
          </button>
        );
      })}

      <button onClick={()=>setShowPopup(true)}>จอง</button>
    </div>
  );
}
export default Cart;