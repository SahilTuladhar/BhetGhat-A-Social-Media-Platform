import "./rightbar.css"
import { Users } from "../../dummyData"
import Requests from "../Requests/Requests"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@material-ui/icons"
import axios from "axios";
import {io} from "socket.io-client"


export default function Rightbar({ user }) {
 



const HomeRightBar = () => {
  const {user} = useContext(AuthContext);
  const socket = useRef();
  const[onlineUsers,setOnlineUsers]=useState([]);

  useEffect(()=>{
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users",(activeUsers)=>{ 
      setOnlineUsers(
        user.following.filter((f)=> activeUsers.some((u)=>u.userId === f)));
      
    })
  },[user]);

    return (
      <>
      
        <div className="rightbarContainer">
          <span className="containerName">Online Followings</span>
          <hr className="rightbarHr" />
          
            
              <Requests onlineUsers={onlineUsers} currentUser={user._id} />
            
           
        </div>
      </>

    )

  };
  

 


  const ProfileRightBar = () => {

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false)
  


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friend");
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  
  useEffect(()=>{
    setFollowed(currentUser?.following.includes(user?._id))
  },[])



  const handleClick = async () => {
    try {
      if (followed) {
        
        const res = await axios.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        localStorage.setItem("user", JSON.stringify(res.data))
        
        dispatch({ type: "UNFOLLOW", payload: user._id });

      } else {
        const res = await axios.put(`/user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        console.log(res.data)
        localStorage.removeItem("user")
        localStorage.setItem("user", JSON.stringify(res.data))
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const[followers,setFollowers] = useState(user.followers.length);

      const[following,setFollowing] = useState(user.following.length);
  
 return (
      <>
        {user?.username !== currentUser?.username && 
         (
          <button className="rightbarFollowButton" onClick={handleClick} >
            {followed ? "Unfollow" : "Follow"}

          </button>
        )}
        <span className="rightbarTitle">User Information</span>
        <div className="rightbarInfo">
          
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Full name: </span>
            <span className="rightbarInfoValue">{user.fullname}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Followers: </span>
            <span className="rightbarInfoValue">{followers}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Following: </span>
            <span className="rightbarInfoValue">{following}</span>
          </div>

        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
