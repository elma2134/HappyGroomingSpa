function BookingPopup({cart,total,onClose,onConfirm}) {
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"#0008"}}>
      <div style={{background:"#fff",padding:20}}>
        <h2>ยืนยัน</h2>

        {cart.map((i,index)=>(
          <div key={index}>{i.name} - {i.price}</div>
        ))}

        <p>รวม {total}</p>

        <button onClick={onConfirm}>ยืนยัน</button>
        <button onClick={onClose}>ยกเลิก</button>
      </div>
    </div>
  );
}
export default BookingPopup;