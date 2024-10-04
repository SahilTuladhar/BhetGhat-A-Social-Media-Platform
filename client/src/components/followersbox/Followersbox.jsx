import "./followersbox.css"
import {Link} from "react-router-dom"

export default function Followersbox({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className="followersFriendBox">
          <li className="followersFriend">
          <Link to ={`../profile/${user.username}`} style={{textDecoration : " none" , color: "black"}} >  
          <img  src={PF+user.profilePicture} alt="" className="followersFriendImg" />
          <span className="followersFriendName">{user.username}</span>
         </Link>
          </li>
   </div>
  )
}
