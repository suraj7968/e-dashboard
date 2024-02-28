import React from "react";

const SignUp = ()=>{
    return(
        <div className="register" >
            <h1>Register</h1>
            <input className="InputBox" autoFocus type="text" placeholder="Enter Name" />
            <input className="InputBox"  type="text" placeholder="Enter Email" />
            <input className="InputBox"  type="password" placeholder="Enter Password" />
            <button className="InputBtn">SignUp</button>
        </div>
    )
}

export default SignUp;