import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
        useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    },[])
    const collectData = async () => {
        console.log(name, email, password);
        var result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.log(result);
        if (result) {
            localStorage.setItem('user',JSON.stringify(result.result))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/');
        }
    }
    return (
        <div className="register" >
            <h1>Register</h1>
            <input className="InputBox" autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            <input className="InputBox" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email" />
            <input className="InputBox" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            <button onClick={collectData} className="InputBtn">SignUp</button>
        </div>
    )
}

export default SignUp;