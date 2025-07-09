import React from "react";
import {Link}from "react-router-dom";

import IITILOGO from "./images/iitilogo.png";
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
        <Link to="/Student/Dashboard" className="mx-8" aria-label="QR Code">
          <i className="fa-solid fa-qrcode"></i>
        </Link>
        <Link to="/Student/Profile" aria-label="Profile">
          <i className="fa-regular fa-user"></i>
        </Link>
        <Link to="/Student/Enroll" aria-label="Enroll">
          <i class="fa-solid fa-address-card"></i>
        </Link>
        <Link to="/Student/Timetable" aria-label="TimeTable">
          <i className="fa-solid fa-table-cells"></i>
        </Link>
        <Link to="/Student/Polls" aria-label="Polls">
     
          <i className="fa-solid fa-square-poll-horizontal">
            
          </i>
        </Link>
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
        <Link to="/Student/Dashboard" >Dashboard</Link>
        <Link to="/Student/Profile">Profile</Link>
        <Link to="/Student/Enroll">Enroll</Link>
        <Link to="/Student/Timetable">TimeTable</Link>
       <Link to="/Student/Polls">Polls <div className="notify"> </div></Link> 
        <div className="logo">
          <img src={IITILOGO} alt="IITI Logo" />
        </div>
      </div>
    </div>
  );
}
