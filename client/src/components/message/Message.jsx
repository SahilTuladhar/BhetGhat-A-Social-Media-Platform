import React from 'react'
import"./message.css"
import {format} from "timeago.js"


const PF = process.env.REACT_APP_PUBLIC_FOLDER


export default function Message({message,own,receiver}) {

  const OwnMessage = () => {
    return(
      <>
           <div className="messageBottomOwn">
           {format(message?.createdAt)}   
           </div>
           <span className='messageText'>{message?.content}</span>
           
      </>

    )
  }

  const GeneralMessage = () => {
    return(
      <>
        <img className='messageImg' src={receiver?.profilePicture ? PF + receiver.profilePicture : PF+"profilepic/pp1.jpg"} alt=''/>
        <p className='messageText'>{message?.content}</p>  
        <div className="messageBottom">
           {format(message?.createdAt)}   
        </div>   
      </>
    )
  }

  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
        {own ? <OwnMessage /> : <GeneralMessage />}
        </div>
    </div>
  )
}
