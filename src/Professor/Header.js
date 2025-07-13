import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <>
    <div className="head" >
      <ul className="nav justify-content-end gap-2  bg-transparent">
        <li className="nav-item">
          <a className="nav-link textdecoration-none text-white" href="/">
            <i className="fa-solid fa-bell"></i>
          </a>
        </li>

        <li className="nav-item  ">
          <div
          style={{fontSize:"20px",display:"flex",flexDirection:"column",height:"10px",padding:"0px",marginLeft:"10px"}}
         
            id="navbarDarkDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           Username
       <p style={{fontSize:"10px",opacity:"0.6",paddingLeft:"30%"}}> Proffessor</p>
           
          </div>
         
        </li>
      </ul>
      </div>
    </>
  );
}
