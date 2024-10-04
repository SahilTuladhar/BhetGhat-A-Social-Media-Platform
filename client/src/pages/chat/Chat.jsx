import "./chat.css"
import Topbar from "../../components/topbar/Topbar"
import Midbar from "../../components/midbar/Midbar"
import Contactname from "../../components/contactname/Contactname"
import { Search } from "@material-ui/icons"
import { useContext, useEffect , useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import Chatbox from "../../components/chatbox/Chatbox"
import {io} from "socket.io-client"
import Chatfollower from "../../components/chatfollower/Chatfollower"


function Chat() {
  const socket = useRef();
  const [contacts,setContacts]= useState([]);
  const [currentChat,setCurrentChat]= useState(null);
  const[onlineUsers,setOnlineUsers]=useState([]);
  const [sendMessage, setsendMessage]= useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const getContacts = async ()=>{
      try{
      const res = await axios.get("/chat/"+user ._id);
      setContacts(res.data)
     
      
      }catch(err){
        console.log(err);
      }
    }
    getContacts();
  },[user._id])
  
  useEffect(()=>{
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users",(users)=>{
      setOnlineUsers(users);
      
    })
  },[user]);

  //send message to socket server
  useEffect(()=>{
    if(sendMessage!==null){
      socket.current.emit('send-message', sendMessage)
    }
  },[sendMessage])

  // receive Message from socket server
   
  useEffect(()=>{
    socket.current.on("receive-message",(data)=>{
      console.log(data)
      setReceivedMessage(data);
    })
  },[]);
  
  const checkOnlineStatus = (c)=>{
    const chatMember = c.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online? true:false
  }

  


  return (
    <>
      <Topbar />
      <Midbar/>
        <div className ="chatContainer">
      <div className="contact">

        <div className="chatTopbarCenter">
              <div className="chatSearchbar">
                 <Search className="seacrchIcon"/>
                 <input placeholder ="Search for Friend , Pages" className="searchInput" />
              </div>
         </div>
          
         <div className="contactContainer1">  

          {contacts.map((c)=>(
        
            <div onClick={()=>setCurrentChat(c)}>
            <Contactname key={c._id}contact={c} currentUser={user} online={checkOnlineStatus(c)}/>
            </div>
          ))}  
           </div>
           
           
           
        </div>
        <Chatbox chat={currentChat} currentUserId ={user} setsendMessage={setsendMessage}  receivedMessage={receivedMessage} />
        <div className="rightbarContainer">
          <span className="containerName"> Followings </span>
          <hr className="rightbarHr" />
        <Chatfollower currentuser ={user} setCurrentChat={setCurrentChat} />
        </div>
      </div>
    </>
  )
}
 
export default Chat