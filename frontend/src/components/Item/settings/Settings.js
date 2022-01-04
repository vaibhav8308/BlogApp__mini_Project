import React, { useContext , useState } from 'react'
import './settings.css'
import Sidebar from "../../sidebar/Sidebar"
import { Context } from '../../../contex.js/Contex'
import axios from 'axios'

function Settings() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
    const {user, dispatch} =useContext(Context);
  const PF = "http://localhost:4000/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
          userId : user._id,
          username,
          email,
          password,
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.profilePic = filename;
          try {
            await axios.post("/upload", data);
            
          } catch (err) {}
        }
        try {
          const res= await axios.put("/users/"+user._id, updatedUser);
          setSuccess(true);
          dispatch({type:"UPDATE_SUCCESS", payload:res.data})
        } catch (err) {
          dispatch({type:"UPDATE_FAILURE"})
        }
      };



    return (
        <div  className='settings'>
            <div className='settingContent'>
                <div className='settingsTitle'>
                    <span className='settingsUpdateTitle'>Update Your Account</span>
                    <span className='settingsDeleteTitle'>Delete Account</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label> Profile Picture</label>
                    <div className='settingsPP'>
                    <img 
                    src={file ? URL.createObjectURL(file): PF + user.profilePic} alt=''/>
                    <label htmlFor='fileInput'>
                    <i className="settingsPPIcon fas fa-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}}
                     onChange={(e)=>setFile(e.target.files[0])}
                    />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email}  onChange={e=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password"  onChange={e=>setPassword(e.target.value)}/>
                    <button className='settingsSubmit' type='submit'>Update</button>
                    {success && <span style={{color:'green'}}>Profile has been Updated Successfully</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}

export default Settings
