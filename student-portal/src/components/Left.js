import React from "react";
import "./left.css";
import IITILOGO from "./images/iitilogo.png";
export default function Left(props) {
  
function hide(){

  let left=document.querySelector(".left");
  let leftadd=document.querySelector(".leftadd")

 leftadd?left.classList.remove("leftadd"):left.classList.add("leftadd")



}
  return (
    
 
    <>
      <div className="left"  >
        <div className="top "onClick={ ()=>{hide()}} ><div className="leftsidebar icon" ><i class="fa-solid fa-angles-left"> </i></div>
         Hide  </div> 
        <img src={IITILOGO} alt="IITILOGO" />
        <div className="block">
          <div className="board icon">
            <i class="fa-solid fa-qrcode"></i>
          </div>
          <div className="board"> Dashboard</div>
        </div>

        <div className="block">
          <div className="board icon">
         <i class="fa-solid fa-user-pen"></i>
          </div>
          <div className="board"> Registration</div>
        </div>
        <div className="block">
          <div className="board icon">
            <i class="fa-solid fa-calendar-days"></i>
          </div>
          <div className="board">TimeTable</div>
     
        
        </div>
        <div className="block">
          <div className="board icon">
          <i class="fa-solid fa-user-check"></i>
          </div>
          <div className="board">Attendance</div>
         
        </div>
        <div className="foot">
          <div className="board icon">
            <i class="fa-solid fa-gear"></i>
          </div>
          <div className="board">Settings</div>
         
        </div>
      </div>
    </>
  );
}
