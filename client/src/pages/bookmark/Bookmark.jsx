import "./bookmark.css"
import Topbar from '../../components/topbar/Topbar';
import Bookmarkfeed from '../../components/bookmarkfeed/Bookmarkfeed';
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext , useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function Bookmark() {
  const [bookmark,setBookmark] = useState([])
  const {user} = useContext(AuthContext)


 
  return (
    <>
   <Topbar />
    <div className="bookmarkContainer">
     <Sidebar bookmark />

    <Bookmarkfeed />
        
     
    </div>
  
    </>
  )
}
