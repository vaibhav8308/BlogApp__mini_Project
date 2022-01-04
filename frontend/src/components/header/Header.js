import React from 'react'
import "./header.css"

function Header() {
    return (
        <div className='header'>
            <div className='headerTitle'>
                <span className='headercontent1'>Hello Public.......</span>
                
                <span className='headercontent2' style={{color:"violet"}}>Welcome to My Blog.........Read others Emotions..Write Your Emotions</span>
            </div>
            <img
            className='HeaderImg'
            src="https://i.pinimg.com/originals/9c/b0/70/9cb070d62dc738a0c3a1a408d68e4af5.jpg"
            alt=""
            />
            

            
        </div>
    )
}

export default Header
