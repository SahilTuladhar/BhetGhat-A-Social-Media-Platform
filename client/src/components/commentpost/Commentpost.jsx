import "./commentpost.css"
import {MoreVert} from "@material-ui/icons"
import axios from "axios"
import Commentbox from "../commentbox/Commentbox"
import {useEffect, useState} from "react";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Commentpost({post}) {
  const[like,setLike] = useState(post.likes.length);
  const[isLiked,setIsLiked] = useState(false);
  const [user,setUser] = useState({})
  const [comments,setComments] = useState([])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const {user:currentUser} = useContext(AuthContext)

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axios.get(`/user?userId=${post.userId}`)

     setUser(res.data)
    }
    
   fetchUser()
  },[post.userId])

  const likeHandler = () => {
    try{
        axios.put("/post/"+post._id+"/like" , {userId:currentUser._id})
    }catch(err){
      console.log(err)
    }

   setLike(isLiked ? like -1 : like + 1)
   setIsLiked(!isLiked)
  }



  useEffect(()=>{
    const fetchComments = async()=>{
      const res = await axios.get(`/post/getcomment/${post._id}`)
     
     setComments(res.data)
    } 
   fetchComments()
  
  },[post?._id])
  





  return (
    <div className="commentPost">
      <div className="commentPostWrapper">

        <div className="postLeft">
            <img src={PF+post.img} alt="" className="commentPostImg" />
        </div>
    
       {/*<div className="clsVertical"> */}

        <div className="postRight">
          <div className="postRightTop">
          <div className="commentPostTop">
             <div className="commentPostTopLeft">
              <Link to={`profile/${user.username}`} >
              <img src={PF+user.profilePicture ||PF+"profilepic/pp1.jpg" } alt ="" className="commentPostProfileImg" />
              </Link>
              <span className="commentPostUsername">
                {user.username}
              </span>
              <span className="commentPostDate">{format(post.createdAt)}</span>
             </div>
             <div className="commentPostTopRight">
              <MoreVert/>
             </div>
        </div>
          </div>
          

        <hr className="commentPostHR" />

        <div className="commentPostRightBottom">
          <div className="commentPostRightBottomLeft">
             <img src={`${PF}heart.png`} alt="" className="commentLikeIcon" onClick = {likeHandler} />
             <span className="commentPostLikeCounter">{like} people liked it</span>
          </div>

        </div>
        
        <div className="commentCaption">
        <span className="commentPostUsername">
          {user.username}
        </span>
        <span className="commentCaptionText">{post?.desc}</span>
        </div>

  

        <div className="postRightBottom">
        {comments.map((c) => (
      <Commentbox key={c._id} onecomment={c}/>
     )) }
        </div>

        
        
      
      
      

        </div>

      </div>  
      
    </div>
 
  )
}
