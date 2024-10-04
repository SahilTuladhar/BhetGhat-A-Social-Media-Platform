import "./commentfeed.css"
import Commentpost from "../commentpost/Commentpost"
import {useEffect, useState} from "react"
import axios from "axios"
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"

export default function Commentfeed({post}) {

  const [posts,setPosts] = useState([])
  const {user} = useContext(AuthContext)


  return (

   <div className="commentfeed">
      <div className="commentFeedWrapper">
        
        <Commentpost post = {post} />
         
      </div>
   </div>
  )
}
