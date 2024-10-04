import "./settingsopt.css"
import { useRef , useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Settingsopt({update}) {



  const Pwsettingsopt = () => {
    const {user} =useContext(AuthContext);
    const currentPassword = useRef()
    const newpassword = useRef()
    const confirmnewpassword = useRef()

    const handleClick = async(e)=>{
      e.preventDefault()
     if(currentPassword.current.value){
      if(confirmnewpassword.current.value !== newpassword.current.value){
        confirmnewpassword.current.setCustomValidity("Passwords don't match")
      }
      else{
        const users ={
          currentPassword : currentPassword.current.value , 
          newpassword : confirmnewpassword.current.value
          
        } 
        try{
      
          await axios.put(`/user/${user._id}`, users)
          window.location.reload(true)
  
        }catch(err){
          console.log(err)
       }
      }}
       
       
      
      }
     
     
    return(
       <>
       <div>
       <form onSubmit={handleClick}>
       
         <div className="settingsOptBox">
        <span className="settingsOptBoxText">Current Password</span>
        <input className= "settingsOptBoxEntry" placeholder=" Enter Current Password" required ref={currentPassword}/>
      </div>

      <div className="settingsOptBox">
        <span className="settingsOptBoxText">New Password</span>
        <input className= "settingsOptBoxEntry" placeholder=" Enter New Password" required ref={newpassword}/>
      </div>

      <div className="settingsOptBox">
        <span className="settingsOptBoxText">Re-Type New</span>
        <input className= "settingsOptBoxEntry" placeholder=" Re-Enter New Password" required ref={confirmnewpassword}/>
      </div>

      <div className="settingsOptBox">
      <button className="changeCp" type='submit '>Update</button>
      </div>
      </form>
      </div>
       </>
    )
  
}
  const Upsettingsopt = () => {
   const navigate = useNavigate()
    const {user} = useContext(AuthContext);
    const age = useRef()
    const From = useRef()
    const Fullname = useRef()
    const Desc = useRef()
    
   
    const[file,setFile]=useState('');
    const[files,setFiles] = useState('')
    
   const handleClick = async(e)=>{
     e.preventDefault()
     const users = {
       Age : age.current.value,
      from:From.current.value,
      fullname: Fullname.current.value,
      desc: Desc.current.value
      
    };
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      users.profilePicture = fileName;
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err)
      }
      }
   
      if(files){
        const data = new FormData();
        const fileName = Date.now() + files.name;
        data.append("name",fileName);
        data.append("file",files);
        users.coverPicture = fileName;
        try{
          await axios.post("/upload", data);
        }catch(err){
          console.log(err)
        }
        }
      
    
     try{
      await axios.put(`/user/${user._id}`,users)
      window.location.reload(true)
      navigate('/')
     
    }catch(err){
      console.log(err)
    }
  
     
   }
    return(
       <>
       <div>
        <form onSubmit={handleClick}>
        <div className="settingsOptBox">
        <span className="settingsOptBoxText">Full name:</span>
        <input className= "settingsOptBoxEntry" ref={Fullname}required placeholder="Enter your full name " />
      </div>

         <div className="settingsOptBox">
        <span className="settingsOptBoxText">Age:</span>
        <input className= "settingsOptBoxEntry" ref ={age} required placeholder=" Enter Age"/>
      
      </div>
      
      <div className="settingsOptBox">
        <span className="settingsOptBoxText">Bio : </span>
        <input className= "settingsOptBoxEntry" ref={Desc} required placeholder=" Enter your bio "/>
      </div>

      <div className="settingsOptBox">
        <span className="settingsOptBoxText">From:</span>
        <input className= "settingsOptBoxEntry" ref={From} required placeholder=" Enter City / Country "/>
      </div>

      
      <div className="settingsOptBox">
      <span className="settingsOptBoxText">Change Profile Image </span>
       <input className="changePp" type="file" 
              id = "file" 
              accept = ".png, .jpeg , .jpg"
             
              onChange={(e)=>setFile(e.target.files[0])}/>
      </div>

      
      <div className="settingsOptBox">
      <span className="settingsOptBoxText">Change Cover Image </span>
      <input className="changeCp"  type="file" 
              id = "file" 
              accept = ".png, .jpeg , .jpg"
              
              onChange={(e)=>setFiles(e.target.files[0])}/>
      </div>
      <div className="settingsOptBox">
      <button className="changeCp" type='submit '>Update</button>
      </div>
      </form>
      </div>
       </>
    )
  }

  return (
    <div className="settingsoptContainer">
      {update ? < Upsettingsopt /> : <Pwsettingsopt/> }
    </div>
  )
  
}
