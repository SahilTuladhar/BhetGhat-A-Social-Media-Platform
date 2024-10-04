import "./suggestions.css"
import {PersonAdd} from "@material-ui/icons"
import {Link} from "react-router-dom"


export default function Suggestions({suggestion}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  


  return (
    <div className="sidebarFriendBox">
          <li className="sidebarFriend">
          <Link to ={`../profile/${suggestion.username}`} style={{textDecoration : " none" , color: "black"}} >  
          <img src={suggestion.profilePicture? PF+ suggestion.profilePicture : PF + '/profilepic/pp1.jpg'} alt="" className="sidebarFriendImg" />
          <span className="sidebarFriendName">{suggestion.username}</span>
          {/* <PersonAdd className="addIcon"  /> */}
          </Link>
          </li>
   </div>
  )
}
