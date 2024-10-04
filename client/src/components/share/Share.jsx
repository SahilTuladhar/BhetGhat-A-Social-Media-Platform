import "./share.css"
import {PhotoSizeSelectActual,Edit, LaptopWindows,Close} from "@material-ui/icons"
import {useContext, useState,useRef} from 'react';
import { Link } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"

export default function Share() {

  const {user:currentUser} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef()
  const [file,setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value
    }
    
    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name",fileName);
      data.append("file",file);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err)
      }
    }

    try{
    await axios.post("/post",newPost)
    window.location.reload(true)
    } catch(err){
        
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop"> 
           <img src= {currentUser?.profilePicture ? PF + currentUser.profilePicture : PF + "profilepic/pp1.jpg" } alt="" className="shareProfileImg" />
           <input required 
           placeholder= { "What's on your mind , " + currentUser.username } 
           className="shareInput"
           ref = {desc}
           />

          {file && 
           <div className="previewImage">
             <Close className= "closeFileIcon" onClick = {() => setFile(null)}/>
             <img src={file.img} alt="" />
           </div>
          }
        </div> 

        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">

            <label htmlFor = "file" className="shareOption">
              <PhotoSizeSelectActual className="shareIcon" />
              <span className="shareOptionText" >Add an Image</span>
              <input 
              style={{display : "none"}} 
              type="file" 
              id = "file" 
              accept = ".png, .jpeg , .jpg" 
              onChange={(e)=>setFile(e.target.files[0])}
              />
            </label>
    
              <div className="shareOption">
                <Edit  className="shareIcon" />
                <span className="shareOptionText"> Edit Profile </span>
              </div>            
          </div>
          <button className="shareButton" type="submit">Post</button>
        </form> 

 

      </div>

    </div>
  )
}

