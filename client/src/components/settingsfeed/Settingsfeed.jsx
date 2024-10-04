import "./settingsfeed.css"
import { VpnKey , Edit } from '@material-ui/icons'
import { Link } from "react-router-dom";

export default function Settingsfeed() {
  return (
    <div className="settingsBox">
        <Link to = "/password" style={{textDecoration : " none" , color: "black"}} >                
          <div className="settingsOption">
             <VpnKey className = "settingsIcon" />
             <span className="settingsText">Change Password</span>
          </div>            
        </Link>
        
        <Link to = "/update" style={{textDecoration : " none" , color: "black"}} >                
         <div className="settingsOption">
            <Edit className = "settingsIcon" />
            <span className="settingsText">Edit User Profile</span>
         </div>        
        </Link>    
      
     </div>
  )
}
