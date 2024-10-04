import "./post.css"
import {MoreVert,Bookmark,Delete} from "@material-ui/icons"
import axios from "axios"
import {useEffect, useRef, useState} from "react";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Commentpopupfeed from "../commentpopupfeed/Commentpopupfeed";
import Commentpopup from "../commentpopup/Commentpopup";


export default function Post({post}) {

  const[like,setLike] = useState(post.likes.length);
  const[isLiked,setIsLiked] = useState(false);
  const [user,setUser] = useState({})
  const [open,setOpen] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const   comment = useRef(null)

  const {user:currentUser} = useContext(AuthContext)

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser?._id))
  },[currentUser?._id,post.likes])

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

const handleClick = ()=>{
     axios.delete(`/post/${post._id}`)
     window.location.reload(true)
}

const handleComment = (e)=>{
  e.preventDefault()
  const comments = {
    postId : post._id,
    username: currentUser.username,
    comment: comment.current.value
  }
  try { 
     axios.post('/post/addcomment', comments)
     comment.current.value = ''
  } catch (error) {
    
  }

}

const handleBookmark = (e)=>{
  e.preventDefault()
  const bookmark = {
    postId:post._id,
    userId:currentUser._id
  }
  try {
    axios.post('/post/addbookmark',bookmark)

  } catch (error) {
    
  }
}

  return (
    <>
    <div className="post">
      <div className="postWrapper">

        <div className="postTop">
           <div className="postTopLeft">
            <Link to={`profile/${user.username}`} >
            <img src={PF+user.profilePicture ||PF+"profilepic/pp1.jpg" } alt ="" className="postProfileImg" />
            </Link>
            <span className="postUsername">
              {user.username}
              
              </span>
            <span className="postDate">{format(post.createdAt)}</span>
           </div>
           <div className="postTopRight">
           
           <div className="dropDownContainer">
             <button type="button"  onClick={() => setOpen(!open)} className = "dropDownIcon">
                <MoreVert   />
             </button>
              
              {open && (
                <div className="dropdown">
                  <ul>
                     <li> 
                      <Delete className="deleteIcon" onClick={handleClick}/> 
                       Delete
                     </li> 
                  </ul>
                </div>
              )}
              
          </div>
                
           
          
           </div> 
        </div>

        <hr className="postHR" />

        <div className="postCenter">
          <img src={PF+post.img} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
             <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick = {likeHandler} />
             <span className="postLikeCounter">{like} people liked it</span>
          </div>

          <div  className="postBottomRight">
             <span  onClick =  {() => setButtonPopup(true)} className="postCommentText">{post.comments} comments</span>
              
            <Bookmark onClick={handleBookmark} className="bookmarkIcon" />
          </div>
        </div>
        
        <div className="caption">
        <span className="postUsername">
          {user.username}
        </span>
        <span className="captionText">{post?.desc}</span>
        </div>

        <form onSubmit={handleComment} >
        <div className="commentSection">
         
           <input placeholder="Add a comment" ref={comment}  className="commentInput" />
           <button className="shareButton" type="submit">Post</button>
        
        </div>
        </form>
        </div>
  
      
    </div>

       <Commentpopup trigger={buttonPopup} setTrigger={setButtonPopup} >
         <Commentpopupfeed post  = {post} />   
      </Commentpopup>
    </>
    
  )
}
