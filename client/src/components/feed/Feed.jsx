import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {useEffect, useState} from "react"
import axios from "axios"
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import Status from "../status/Status"

//import { Posts } from "../../dummyData"



export default function Feed({username}) {
  const [posts,setPosts] = useState([])
  const {user} = useContext(AuthContext)


  useEffect(()=>{

    const fetchPosts = async()=>{
      const res = username 
      ? await axios.get('/profile/'+ username) 
      : await axios.get('/post/timeline/' + user._id)
     
     
     setPosts(res.data.sort((p1,p2) =>{
      return new Date (p2.createdAt) - new Date(p1.createdAt);
     })
     )
    ;
    }
    
   fetchPosts()
  },[username ,user?._id])


  return (

    <div className="feed">
   
    <div className="feedWrapper">
      <Share/>


     {posts.map((p) => (
      <Post key={p._id} post={p}/>
     )) } 
    
    </div>
 </div>
  )
}
