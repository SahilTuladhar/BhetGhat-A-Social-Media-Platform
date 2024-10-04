import "./status.css"
import {MoreVert,Bookmark} from "@material-ui/icons"
import axios from "axios"
import {useEffect, useState} from "react";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Status({post}) {
    const[like,setLike] = useState(post.likes.length);
    const[isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState({})
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
  
    return (
    <div className="status">
       <div className="statusWrapper">
        
       <div className="statusTop">
             <div className="statusTopLeft">
              <Link to={`profile/${user.username}`} >
              <img src={user.profilePicture ||PF+"profilepic/pp1.jpg" } alt ="" className="statusProfileImg" />
              </Link>
              <span className="statusUsername">
                {user.username}
                </span>
              <span className="statusDate">{format(post?.createdAt)}</span>
             </div>
             <div className="statusTopRight">
             <MoreVert />
             </div>
       </div>
  
       <hr className="statusHR" />
  
       <div className="statusCenter">
          <span className="statusText">{post?.desc}</span>
       </div>
      
       <div className="statusBottom">
            <div className="statusBottomLeft">
               <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick = {likeHandler} />
               <span className="statusLikeCounter">{like} people liked it</span>
            </div>
  
            <div className="statusBottomRight">
            <Link to = "/statuspage" style= {{textDecoration : "none", color : "black"}}>
                <span className="statusCommentText">{post.comments} comments</span>
            </Link>
              
              <Bookmark className="bookmarkIcon" />
            </div>
        </div>
      
        <div className="commentSection">
             <input placeholder="Add a comment" className="commentInput" />
             <button className="shareButton">Post</button>
        </div>
  
        
      
      </div>
   </div>
    )
}
