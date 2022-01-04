import React from 'react'
import { Link } from 'react-router-dom'
import "./login.css"
import axios from "axios"
import { Context } from '../../../contex.js/Contex'
import{ useContext ,  useRef} from "react";




function Login() {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch , isFetching}= useContext(Context)

     const handleSubmit= async(e)=>{
         e.preventDefault()
         dispatch({type:"LOGIN_START"})
         try {
            const res=  await axios.post("/auth/login",{
                username : userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({type:"LOGIN_SUCCESS", payload:res.data})
         } catch (err) {
            dispatch({type:"LOGIN_FAILURE"}) 
         }
     }
 
    return (
        <div className='login'>
            <span className='loginTitle'> Login Here...</span>
            <form className='loginForm' onSubmit={handleSubmit}>
          <label> Username</label>
          <input type=" text" className='loginInput' placeholder='Username' ref={userRef}/>
          <label> Password</label>
          <input type="password" className='loginInput' placeholder='password' ref={passwordRef} />
          <button className='loginButton' type ="submit" disabled={isFetching}>
              Login</button>
            </form>
            <div>
                Not a Member?
            <button className='loginRegisterButton'>
                <Link className='link' to="/register">Register Here..</Link>
            </button>
        </div>
        </div>
    )
}

export default Login
