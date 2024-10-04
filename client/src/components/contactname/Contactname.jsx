import React from 'react'
import "./contactname.css"
import { useEffect , useState } from "react"

import axios from 'axios';

function Contactname({contact, currentUser, online}) {

    const[user,setUser]= useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=>{
        const friendId = contact.members.find((m)=>m !== currentUser._id);

        const getUser = async()=>{
        try{
            const res = await axios("/user?userId="+friendId);
            setUser(res.data)
        } catch(err){
            console.log(err);
        }
    };
    getUser();
    },[]);
  return (
    <div className="contactbox">
              <ul className="contactFriendList">
                <li className="contactFriend">
                  <div>
                  {online && <div className='online-status'></div>}
                    <img src={user?.profilePicture ? PF + user.profilePicture : PF+"profilepic/pp1.jpg"}alt ="" className="contactProfileImg" />
                    <div className="online" />
                    <span className="contactUsername">{user?.username}</span> 
                      <span className="contactMessage">{online? "Online":"Offline"}</span>
                  
                </div>
                </li>
             </ul>
    </div>
  )
 
}

export default Contactname