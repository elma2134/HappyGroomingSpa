import { useState } from "react";

export default function Login() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const login = async ()=>{
    const res = await fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,password})
    });

    const data = await res.json();

    if(res.ok){
      localStorage.setItem("token",data.token);
      window.location.href="/admin";
    }else{
      alert(data.message);
    }
  };

  return (
    <div className="p-10">
      <input placeholder="user" onChange={e=>setUsername(e.target.value)} />
      <input placeholder="pass" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}