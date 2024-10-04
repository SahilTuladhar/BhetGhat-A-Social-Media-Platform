import "./signup.css"
import { Link, redirect } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const username = useRef()
  const password = useRef()
  const email = useRef()
  const confirmpassword = useRef()
  const navigate = useNavigate()


  const handleClick =async (e)=>{
     e.preventDefault()
      if(confirmpassword.current.value !== password.current.value){
        confirmpassword.current.setCustomValidity("Passwords don't match")
      }else{
          const user = {
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
            confirmpassword:confirmpassword.current.value

          }
          try{
          const res=   await axios.post('/signup',user)
          window.location.true()
            navigate ('/login')
            

          }catch(err){
            console.log(err)
          }
      }
   
  }

  return (
    <div className="login">
      <div className="loginWrapper">
      <img src="/assests/BGlogo.png" alt="" className="loginLogoImg" />
        <div className="loginLeft">
          <h3 className="loginLogoText">BhetGhat</h3>
          <span className="loginDesc">A place for people to connect</span>
        </div>
        <div className="loginRight">
          <form className="loginBox1" onSubmit={handleClick}>
             <input placeholder="Email" required ref = {email} className="emailInput1" type = "email" />
             <input placeholder="Username" required ref = {username} className="userNameInput" />
             <input placeholder="Enter New Password" required   type ="password" ref= {password} className="pwInput1" />
             <input placeholder="Confirm Password" required type="password" ref ={confirmpassword} className="pwInput1" />
             <button className="loginButton" type = "submit">Sign Up</button>
             <Link to = "/login " style={{textDecoration : " none" , color: "black"}}> 
                <span className="loginText">Already have an account? <b className="signUpText">Log in</b></span>
             </Link>
             
          </form>
        </div>
      </div>
    </div>
  )
}
