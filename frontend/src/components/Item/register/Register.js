import React from 'react'
import {useState} from "react"
import "./register.css"
import { Link } from 'react-router-dom'
import axios from "axios"
function Register() {
    const [username , setUsername]= useState("")
    const [email , setEmail]= useState("")
    const [password , setPassword]= useState("")
   const [error, setError]=useState(false)

    const handleSubmit= async(e)=>{
     e.preventDefault();
     setError(false);
     try{
     const res = await axios.post("/auth/register",
     {
         username,
         email,
         password,
     });
     res.data && window.location.replace("/login");
    }catch(err){
     setError(true);
    }
    };
    return (
        <div className='register'>
            <span className='registerTitle'> Register Here...</span>
            <form className='registerForm' onSubmit={handleSubmit}>
            <label> Username</label>
          <input type=" text" className='registerInput' placeholder='Username'
           onChange={e=>setUsername(e.target.value)}
          />
          <label> Email</label>
          <input type=" text" className='registerInput' placeholder='email'
          onChange={e=>setEmail(e.target.value)}
          />
          <label> Password</label>
          <input type="password" className='registerInput' placeholder='password'
           onChange={e=>setPassword(e.target.value)}
          />
          <button className='registerButton' type='submit'>Register</button>
            </form>
            <div>
                Already a Member?
            <button className='registerLoginButton'>
            <Link  className="link" to="/login">Login Here..</Link>
            
            </button>
            {error && <span>Something went wrong !</span>}
        </div>
        </div>
    )
}

export default Register
