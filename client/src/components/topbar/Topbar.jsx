import "./topbar.css"
import {Search,Person, Chat, Notifications} from "@material-ui/icons"
import {useState , useEffect} from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import { useRef } from "react";
import axios from "axios";

import {useParams} from 'react-router'


export default function () {
  const [ buttonPopup , setButtonPopup] = useState(false);
    const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const username = useParams().username
  const search = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;




const handleClick = async(e)=>{
  e.preventDefault()
      const user = search.current.value   
      try{
        await axios.get(`/profile/${user}`)
       navigate(`/profile/${user}`)
       window.location.reload(true)
     
      }catch(err){
        console.log(err)
      }
}

const handleLogout = async(e)=>{

    localStorage.removeItem('user')
    
    window.location.reload(true)
    navigate('/login')
}

  return (
    <div className='topbarContainer'> 
       <div className="topbarLeft">
       <Link to = "/" style={{textDecoration : " none" , color: "#0c184efc" }}>
           <img src="/assests/BGlogo.png" alt="" className="logoImg" />
       </Link>

       <Link to = "/" style={{textDecoration : " none", color: "#0c184efc" }}>
           <span className="logoText">BhetGhat</span>
       </Link>
            
             
       
          
       </div>
       
       <div className="topbarCenter">
            <div className="searchbar">
              <form onSubmit={handleClick} className = "form">
               <Search className="seacrchIcon"/>
               <input  ref = {search} placeholder ="Search for Friend,Pages" className="searchInput" />
              
               </form>
            </div>
       </div>

       <div className="topbarRight">

            <div className="topbarIcons">
             <div className="topbarIconItem">
               <Link to = "/friends" style={{textDecoration : " none" , color : "black" }}>
                 <Person/>         
               </Link>
               
             </div>
             <div className="topbarIconItem">

             <Link to = "/chat" style={{textDecoration : " none" , color : "black" }}>
                 <Chat/>         
            </Link> 
              
             </div>

             <span className="topbarLink" onClick={handleLogout}>Logout</span> 
            </div>

           
           <Link to = {"/profile/"+ user?.username} style={{textDecoration : " none"}}>
               <img src={PF+user.profilePicture ||PF+"profilepic/pp1.jpg"} alt="" className="topbarImg" />      
           </Link>
            
       </div>
   
    </div>
  );
}

