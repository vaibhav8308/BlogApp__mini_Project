import React, { useContext } from 'react'
import {  useEffect , useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./singlePost.css"
import axios from "axios"
import {Link} from "react-router-dom"
import { Context } from '../../contex.js/Contex'
function SinglePost() {
    const location = useLocation()
    const path=location.pathname.split("/")[2];
    const [post, setPost]=useState({})
    const PF = "http://localhost:4000/images/";
    const { user } = useContext(Context);
    const [title , setTitle]=useState("")
    const [desc , setDesc]=useState("")
    const [updateMode , setUpdateMode]=useState(false)
    useEffect(() => {
      const getPost = async()=>{
          const res = await axios("/posts/"+ path);
          setPost(res.data)
          setTitle(res.data.title)
          setDesc(res.data.desc)
      } 
      getPost()
    }, [path])


    const handleDelete =async ()=>{
        try {
            await axios.delete(`/posts/${post._id}`,
             {data:{username:user.username},});
            window.location.replace("/");
        } catch (err) { }
       
    }
    const handleUpdate= async()=>{
        try {
            await axios.put(`/posts/${post._id}`,
             {username:user.username, title,desc});
            //window.location.reload();
            setUpdateMode(false)
        } catch (err) { }
       
    }

    
    return (
        <div className='singlePost'>
            <div className='singlePostContent'>
                {post.photo &&(
                <img src={PF + post.photo}
                 alt='' 
                 className='singlePostImg'/>
                )}{
                    updateMode ? <input type="text" className='singlePostTitleInput' value={title 
                        } onChange={(e)=>setTitle(e.target.value)}
                        /> :(

                   
            <h1 className='singlePostTitle'>
                {title}
                {post.username === user?.username &&(
            <div className='singlePostEdit'>
            <i className=" singlePostIcon fas fa-edit" onClick={()=>setUpdateMode(true)}></i>
       
            
            <i className=" singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>
            </div>
             )}
            </h1>
             )
            }
            <div className='singlePostInfo'>
            <span className='singlePostAuthor'>Written By :
            <Link to={`/?user=${post.username}`} className='link'>
            <b>{post.username}</b>
            </Link>
            </span>
            <span className='singlePostAuthor'>{new Date(post.createdAt).toDateString}</span></div>
            {updateMode ?(
            <textarea value={desc} className="singlePostDescInput"
             onChange={(e)=>setDesc(e.target.value)}/>
            ):(

           
            <p className='singlePostDesc'>
               {desc}

            </p>
             )
            }
            {updateMode &&(
            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
            )}
            </div>
        </div>
    )
}

export default SinglePost
