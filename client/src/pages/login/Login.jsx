import "./login.css"
import { Link } from "react-router-dom";
import {useRef} from 'react'
import {loginCall} from '../../apiCalls'
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'


export default function Login() {
 const username = useRef()
 const password = useRef()


const {user, isFetching , error, dispatch} =useContext(AuthContext)

 const handleClick = (e)=>{
  e.preventDefault()
  loginCall({username:username.current.value,password:password.current.value} , dispatch)
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
          <form className="loginBox" onSubmit={handleClick}>
             <input placeholder="Username" className="emailInput"  required ref = {username}/>
             <input placeholder="Password" type = "password" required  className="pwInput" ref = {password} />
             <button className="loginButton">Log In</button>
             <Link to = "/signup " style={{textDecoration : " none" , color: "black"}}> 
               <span className="loginText">Create a New Account?<b className="signUpText">Sign up </b>  </span> 
             </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
