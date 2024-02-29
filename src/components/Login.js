import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);
    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('profile')
        } else {
            alert("Please enter Correct details");
        }
    }
    return (
        <div className="login">
            <h1>Login Page</h1>
            <input type="text" className="InputBox" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter Email" />
            <input type="password" className="InputBox" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter Password" />
            <button type="button" onClick={handleLogin} className="InputBtn" >Login</button>
        </div>
    )
}

export default Login;