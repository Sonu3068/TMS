import React from 'react'
import {Link}from "react-router-dom";

export default function Login() {
  return (
    <>
       <div className="login"  >
   <img src="\iitilogo.png" alt="IITI-Logo" className="img"/>
    
    <div className="right">
     <h1> Log In</h1>   
    <p> <i className="fa-solid fa-circle-user"></i> 
     :<input type="email" name="Mail-id" id="Mail-id" placeholder="Please Enter your mail Id" required/> </p>
     <br/>
     <p> <i className="fa-solid fa-envelope"></i>
     : <input type="password" name="Password" id="Password" placeholder="Please Enter your Password" required/></p> 
    <br/>
    <Link to="/Student"   className="submit" > <input type="button" value="submit"/></Link>
    <br/>
<Link to="/" className="fg" target="_blank">forgot password </Link>
<p>Don't Have an account?<Link to="/" className="register" >Register</Link> </p>
</div> 
</div>
    </>
  )
}
