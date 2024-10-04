import { useState } from "react"
import { useEffect } from "react"
import "./commentbox.css"
import {Link} from "react-router-dom"





export default function Commentbox({onecomment}) {


  return (       
        <div className="commentFriendBox">
        <li className="commentFriend">
      
        <span className="commentFriendName">{onecomment?.username}</span>
      
        <span className="otherComment">{onecomment?.comment}</span>
        </li>
 </div>
  
      
  )
}
