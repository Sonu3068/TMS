import React from "react";
import {Link}from "react-router-dom";

import IITILOGO from "../components/images/iitilogo.png";
import "./left.css";

export default function Left(props) {
  return (
    <div className="left d-flex">
      <div className="firstleft d-flex">
        <Link
          
          onClick={props.toggleSidebar}
          className="top"
          aria-label="Toggle sidebar"
        >
          <i
            className={`fa-solid fa-angles-${
              props.isExpanded ? "left" : "right"
            }`}
          ></i>
        </Link>
        <Link to="/Proffessor/Proffessordashboard" className="mx-8" aria-label="QR Code">
          <i className="fa-solid fa-qrcode"></i>
        </Link>
        <Link to="/Proffessor/Profile" aria-label="Profile">
          <i className="fa-regular fa-user"></i>
        </Link>
      
        <Link to="/Proffessor/Timetable" aria-label="TimeTable">
          <i className="fa-solid fa-table-cells"></i>
        </Link>
        <Link to="/Proffessor/Requests" aria-label="Requests">
     
        <i class="fa-solid fa-hand"></i>
        </Link>
          <Link to="/Proffessor/Proffessorpolls"> <i className="fa-solid fa-square-poll-horizontal"></i></Link>
      </div>
      <div
        className={`secondleft d-flex ${props.isExpanded ? "" : "collapsed"}`}
      >
        <Link
          
          onClick={props.toggleSidebar}
          className="top"
          aria-label="Toggle sidebar"
        >
          Hide
        </Link>
        <Link to="/Proffessor/Proffessordashboard" >Dashboard</Link>
        <Link to="/Proffessor/Profile">Profile</Link>
       
        <Link to="/Proffessor/Timetable">TimeTable</Link>
       <Link to="/Proffessor/Requests">Request </Link> 
        <Link to="/Proffessor/Proffessorpolls">Conduct-Polls</Link>
        <div className="logo">
          <img src={IITILOGO} alt="IITI Logo" />
        </div>
      </div>    </div>
  );
}
