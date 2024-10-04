import "./sidebar.css"
import { HomeOutlined, TextsmsOutlined, NotificationsNoneOutlined, SettingsOutlined, BookmarkBorderOutlined } from "@material-ui/icons"
import { Users } from "../../dummyData";
import Suggestions from "../suggestions/Suggestions";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
export default function Sidebar({bookmark,settings }) {

  

  const [buttonPopup, setButtonPopup] = useState(false);



  const [suggested , setSuggested] = useState([])
  useEffect(()=>{
    const getSuggested = async () => {
      try {
        const SuggestedList = await axios.get("/user/suggested");
      
        setSuggested(SuggestedList.data)
       
      } catch (err) {
        console.log(err);
      }
    };
    getSuggested();
    
  }, []);

  const GeneralSidebar = () => {
    return (
      <> 
      <div className="sidebarContainer1">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HomeOutlined className="sidebarIcon" />
            <Link to = "/" style={{textDecoration : " none" , color: "black"}} >                
            <span className="sidebarListItemText">Home</span>
            </Link>  
          </li>
        </ul>

        <ul className="sidebarList">
          <li className="sidebarListItem">
            <TextsmsOutlined className="sidebarIcon" />
            <Link to = "/chat" style={{textDecoration : " none" , color: "black"}} >  
           <span className="sidebarListItemText">Message</span>
            </Link>  
          </li>
        </ul>

        <ul className="sidebarList">
          <li className="sidebarListItem">
            <SettingsOutlined className="sidebarIcon" />
            <Link to = "/settings" style={{textDecoration : " none" , color: "black"}} >  
            <span className="sidebarListItemText">Settings</span>
            </Link>  
          </li>
        </ul>

        <ul className="sidebarList">
          <li className="sidebarListItem">
            <BookmarkBorderOutlined className="sidebarIcon" />
            <Link to = "/bookmark" style={{textDecoration : " none" , color: "black"}} >  
            <span className="sidebarListItemText">Bookmark</span>
            </Link>  
          </li>
        </ul>
      </div>


      <div className="sidebarContainer2">
        <span className="containerName">Suggested</span>
        <hr className="sidebarHr1" />

        <ul className="sidebarFriendList">
          {suggested.map((u) => (
            <Suggestions key={u.id} suggestion={u} />
          ))}
        </ul>
      </div>

      </>
    )
  }

const BookmarkSidebar = () => {
  return(
    <>
    <div className="sidebarContainer1">
    <ul className="sidebarList">
      <li className="sidebarListItem">
         <HomeOutlined className="sidebarIcon"/>
         <Link to = "/" style={{textDecoration : " none" , color: "black"}} >                
            <span className="sidebarListItemText">Home</span>
         </Link>
      </li>
    </ul>

    <ul className="sidebarList">
      <li className="sidebarListItem">
         <TextsmsOutlined  className="sidebarIcon"/>
         <Link to = "/" style={{textDecoration : " none" , color: "black"}} >                
            <span className="sidebarListItemText">Message</span>
        </Link>
      </li>
    </ul>

    <ul className="sidebarList">
      <li className="sidebarListItem">
         <SettingsOutlined  className="sidebarIcon" />
         <Link to = "/settings" style={{textDecoration : " none" , color: "black"}} >                
            <span className="sidebarListItemText">Settings</span>
         </Link>
      </li>
    </ul>

    <ul className="sidebarList">
      <li className="sidebarListItem">
         <BookmarkBorderOutlined  className="sidebarIcon" />
         <Link to = "/bookmark" style={{textDecoration : " none" , color: "black"}} >                
            <span className="sidebarListItemText">Bookmark</span>
         </Link>
      </li>
    </ul>
  </div>
 
    </>
    
  
  )    
}


return (
  <div className="sidebar">
       {bookmark || settings ? <BookmarkSidebar/> : <GeneralSidebar />}
  </div>
  );
}