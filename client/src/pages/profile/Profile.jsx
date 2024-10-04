import React, { Component } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import "./profile.css"
import {useEffect, useState} from "react"
import axios from 'axios'
import {useParams} from 'react-router'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser] = useState()
  const username = useParams().username

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axios.get(`/user?username=${username}`)

     setUser(res.data)
    }
    
   fetchUser()
  },[username])

  return (
    <>
    <Topbar />
     <div className="profile">
       <Sidebar />
       <div className="profileRight">

          <div className="profileRightTop">

            <div className="profileCover">
               <img src={PF + user?.coverPicture || PF+'posts/post5.jpg'} alt="" className="profileCoverImg" />
               <img src={PF + user?.profilePicture ||  PF+'profilepic/pp3.jpg'} alt="" className="profileUserImg" />
            </div>

            <div className="profileInfo">
              <span className="profileInfoName">{user?.username}</span>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
            
          </div>
          <div className="profileRightBottom">
               <Feed username = {username} />    
             <div className="rightBottomRight">
              {
                user &&
                <Rightbar user = {user} />
              }
             </div>
            
          </div>
         
       </div>
    </div>
     
   
     </>
  )
}
