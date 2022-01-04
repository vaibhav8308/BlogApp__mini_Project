import React from 'react'
import "./sidebar.css"
import axios from "axios"
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"

function Sidebar() {
    const [cats , setCats]= useState([]);

    useEffect(() => {
        const getCats = async ()=>{
            const res = await axios.get("http://localhost:4000/backend/categories")
          setCats(res.data)
        }
        getCats()
    }, [])
    return (
        <div className='sidebar'>
            <div classname="sidebarItem">
                <span className='sidebarTitle'>About Me</span>
            <img className="sidebarImg" src='https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80' alt=''/>
                 <p>i am creating new posts</p>  
                   </div>
                   <div classname="sidebarItem">
                   <span className='sidebarTitle'>Categories</span>
                        
                        <ul className='sidebarList'  >
                            {cats.map((c)=>(
                                <Link className='link' to={`/?cat=${c.name}`}>
                                 <li className='sidebarListItem'>{c.name}</li>
                                </Link>
                        
                            ))}
                            
                         
                            </ul>  
                            </div> 
                            <div className='sidebarItem'>
                            <span className='sidebarTitle'>follow us</span>
                            <div className='sidebarSocial'>
                            <i className="sideicon fab fa-facebook-square"></i>
            <i className="sideicon fab fa-instagram-square"></i>
                            </div>
                            </div>
        </div>
    )
}

export default Sidebar
