import React from 'react'
import { Link } from 'react-router-dom';
import "./topbar.css"
import { Context } from '../../contex.js/Contex';
import { useContext } from "react";

function Topbar() {
    const {user, dispatch}=useContext(Context);
    const PF = "http://localhost:4000/images/"
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"});
    };
    return (
   
        <div className='Top'>
            <div className='left'>
            <i className="icon fab fa-facebook-square"></i>
            <i className="icon fab fa-instagram-square"></i>
            </div>
            <div className='centre'>
                <ul className='list'>
                    <li className='items'>
                        <Link className='link' to="/" > Home</Link>
                    </li>
                   
                    <li className='items'><Link className='link' to="/createBlog" > CREATE-BLOG</Link>
                    </li>
                   
                   
                    <li className='items' onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className='right'>
                {
                    user ? (
                        <Link to ="/settings" >
                        <img 
                        className='profile'
                        src={PF + user.profilePic} alt='' />
                      </Link>
                    ):(
                        <ul className='list'>
                        <li className='items'><Link className='link' 
                        to="/login" > LOGIN</Link></li>
                        <li className='items'><Link className='link' 
                        to="/register" > REGISTER</Link></li>
                        </ul>

                    )
                }
               
                <i className=" searchbar fas fa-search"></i>
            </div>

        </div>
    )
}

export default Topbar
