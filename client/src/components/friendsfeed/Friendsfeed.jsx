import "./friendsfeed.css"
//import { Users } from "../../dummyData";
import Followersbox from "../followersbox/Followersbox";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState , useEffect } from "react";
import axios from "axios";




export default function Friendsfeed() {
 
  const [following , setFollowing] = useState([])
  const [ follower , setFollower] = useState([])

  
  useEffect(()=>{
    const fetchFollowing = async()=>{
      const res = await axios.get('/user/friend')
    setFollowing(res.data)
    }
    
   fetchFollowing()
  },[])

  useEffect(()=>{
    const fetchFollower = async()=>{
      const res = await axios.get('/user/follower')
    setFollower(res.data)
    }
    
   fetchFollower()
  },[])

  return (
    <div className="friendsfeed">

      <div className="ffContainer1">
        <span className="ffContainerName"> Followers</span>
         <hr className="ffHr" />

         <ul className="ffFriendList">
          {follower.map((u) => (
            <Followersbox key={u.id} user={u} />
          ))}
        </ul>

      </div>

       <div className="ffContainer2">
       <span className="ffContainerName"> Followings</span>
       <hr className="ffHr" />

       <ul className="ffFriendList">
          {following.map((f) => (
            <Followersbox key={f.id} user={f} />
          ))}
        </ul>
       
       </div>

    </div>
  )
}
