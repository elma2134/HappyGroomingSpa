function PetForm({size,setSize,petType,setPetType,breed,setBreed,breeds}) {
  return (
    <div>
      <h2>เลือกข้อมูลสัตว์</h2>

      <div>
        {["S","M","L"].map(s=>(
          <button key={s} onClick={()=>setSize(s)}>{s}</button>
        ))}
      </div>

      <select onChange={(e)=>setPetType(e.target.value)}>
        <option value="">เลือกสัตว์</option>
        <option value="dog">หมา</option>
        <option value="cat">แมว</option>
      </select>

      <select onChange={(e)=>setBreed(e.target.value)}>
        <option>เลือกพันธุ์</option>
        {petType && breeds[petType].map(b=>(
          <option key={b.name}>{b.name}</option>
        ))}
      </select>
    </div>
  );
}
export default PetForm;