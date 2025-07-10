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
        <Link to="/Admin/Admindashboard" className="mx-8" aria-label="QR Code">
          <i className="fa-solid fa-qrcode"></i>
        </Link>
        <Link to="/Admin/Profile" aria-label="Profile">
          <i className="fa-regular fa-user"></i>
        </Link>
                     <Link to="/Admin/Edit"> <i class="fa-solid fa-pen"></i></Link> 
      
        <Link to="/Admin/Admintimetable" aria-label="TimeTable">
          <i className="fa-solid fa-table-cells"></i>
        </Link>
        <Link to="/Admin/Requests" aria-label="Requests">
     
        <i class="fa-solid fa-hand"></i>
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
        <Link to="/Admin/Admindashboard" >Dashboard</Link>
        <Link to="/Admin/Profile">Profile</Link>
             <Link to="/Admin/Edit">Edit </Link> 
       
        <Link to="/Admin/Admintimetable">TimeTable</Link>
       <Link to="/Admin/Requests">Requests</Link> 
   
        <div className="logo">
          <img src={IITILOGO} alt="IITI Logo" />
        </div>
      </div>    </div>
  );
}
