function ServiceList({services,size,petType,breed,getFinalPrice,addToCart}) {
  return (
    <div>
      {services.map(s=>(
        <div key={s.id}>
          <h3>{s.name}</h3>

          {size && <p>{getFinalPrice(s)} บาท</p>}

          <button onClick={()=>addToCart(s)}>
            เพิ่ม
          </button>
        </div>
      ))}
    </div>
  );
}
export default ServiceList;