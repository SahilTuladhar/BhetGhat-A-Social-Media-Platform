import "./chatfollower.css"

import  React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';


function Chatfollower({currentuser,setCurrentChat}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
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
      }, [currentuser]);

    const handleClick = async(user)=>{
    
      try{
        const res = await axios.get(`/chat/find/${currentuser._id}/${user._id}`);
        //setCurrentChat(res.data);
        if(res.data=== null){
          const newChat = {
            senderId : currentuser._id,
            receiverId : user._id
        }
        try{
            const res = await axios.post("/chat",newChat);
            setCurrentChat(res.data)
            //window.location.reload(true)
            } catch(err){
                
            }
          

        }
        else{
          setCurrentChat(res.data)

        } 
        
      
  
     
    
    
        
    
     }catch(err){

     }
    } 
  return (
    <>
    {friends.map((o)=>{
        return(
        <ul className="chatFollowerList">
        <div className='chatFollowingBox'>
            <li className="chatFollowing" onClick={()=>handleClick(o)}>
            <img
            src={o.profilePicture ? PF+o.profilePicture : PF+"profilepic/pp1.jpg"} 
            alt=""
            className='chatFollowingImage'/>
            <span className='chatFollowingName'>{o.username}</span>
            </li>
        </div>
        </ul>
        )
        })}
  </>
  )
}

export default Chatfollower