import "./bookmarkfeed.css"
import Post from "../post/Post"
import { useState, useContext , useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"


export default function Bookmarkfeed(bookmark) {
  const [posts,setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{

    const fetchPosts = async()=>{
      const res = await axios.get('/post/bookmark/' + user._id)
     
    
     setPosts(res.data.sort((p1,p2) =>{
      return new Date (p2.createdAt) - new Date(p1.createdAt);
     })
     )
    ;
    }
    
   fetchPosts()
  },[])
  

  return (
    <div className="bookmarkFeed">
      <div className="bookmarkfeedWrapper">
    
      {posts.map((p) => (
      <Post key={p._id} post={p}/>
     )) } 
      </div>
    </div>
  )
}
