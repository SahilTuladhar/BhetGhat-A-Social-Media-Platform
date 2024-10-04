import { useRef , useContext} from "react"
import "./chatbox.css"
import Message from '../message/Message'
import {useEffect , useState } from "react"
import axios from "axios"
import InputEmoji from 'react-input-emoji'
const PF = process.env.REACT_APP_PUBLIC_FOLDER




function Chatbox ({chat,currentUserId,setsendMessage,receivedMessage }) {
    const[users ,setUser]= useState(null);
    const [messages,setMessages]= useState([]);
    const [newMessage,setNewMessage]= useState("");
    
    
    
    /*const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }*/
    
 

    useEffect(()=>{
        const friendId = chat?.members?.find((m)=>m !== currentUserId._id);
        console.log(friendId)
        const getUser = async()=>{
        try{
            const res = await axios("/user?userId="+friendId);
            setUser(res.data)
            
        } catch(err){
            console.log(err);
        }
    };
    getUser();
    },[chat]);
 
    
  useEffect(()=>{
    const getMessages = async ()=>{
      try{
      const res=  await axios.get("/message/"+chat?._id);
      setMessages(res.data)
    }
    catch(err){ 
      console.log(err)
    }

    };
    getMessages();
  },[chat]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages]);

  const handleOnEnter = async () => {
    //e.preventDefault();
    if(newMessage !== ""){
    const message={
      chatId: chat._id,
      senderId: currentUserId._id,
      content: newMessage,
    };


    const receiverId = chat.members.find((m)=> m !== currentUserId._id);
    setsendMessage({...message, receiverId})
  
    try{
      const res = await axios.post("/message",message);
      setMessages([...messages,res.data])
      setNewMessage("")
    }catch(err){
      console.log(err)
    }}
  };

  useEffect(()=> {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
    
  
  },[receivedMessage])
  
 

 useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages]);
  const scrollRef = useRef();

 

  
  
  return (
    <>
    <div className='chatbox'>
      {chat ?(
      <>
      <div className='chatbox1'>
     <div className='chatHeader'>
     <div className='chatleft'>
        <img src={users?.profilePicture ? PF + users.profilePicture : PF+"profilepic/pp1.jpg"} alt ="" className="headProfileImg" />
        <span className="headUsername">{users?.username}</span>
        </div>
    </div>
    <hr className='chatHr'/>
    <div className='chatContent'>
    {messages.map((m)=>(
      
      <div ref={scrollRef}>
      <Message message={m} own={m?.senderId === currentUserId._id} receiver={users}/>
      </div>
     
      ))}
    
    </div>
    
    <div className='chatBoxButton'>
     
      <InputEmoji  value={newMessage} placeholder="Type your message"
      onChange={setNewMessage} cleanOnEnter onEnter={handleOnEnter} 
      
      />
      
      <button className="chatSubmitButton" onClick = {handleOnEnter} >Send</button>
      
      
    </div>{" "}
    
    </div>
     </>
     ):(
      <span className="noConversationText">Tap on a contact to start a chat</span>
      )}
    </div>
    </>
  )
}

export default Chatbox
