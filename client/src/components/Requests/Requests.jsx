import "./requests.css"

import { useState } from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

export default function Requests({onlineUsers,currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const[onlinefollowing,setOnlinefollowing]=useState([])
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friend");
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  
  

  useEffect(()=>{
    setOnlinefollowing(friends.filter(f=>onlineUsers.includes(f._id)));
  },[friends,onlineUsers])

  

  
  return (
    <>
    {onlinefollowing.map((o)=>{
      return(
    <ul className="rightbarFriendList">
    
    <div className="rightbarFriendBox">
      
       <li className="rightbarFriend">
        
          <div>
          <Link to ='/chat' style={{textDecoration : " none" , color: "black"}} >  
          <img className="rightbarFriendImg" src={o?.profilePicture ? PF + o.profilePicture : PF +"profilepic/pp1.jpg" } alt=""  />
          <div className="online" />
          <span className="rightbarFriendName">{o.username}</span>
          </Link>
          </div>
         
       </li>
       
    </div>
    
  
  </ul>
      )
})} 
  </>
  )
}
