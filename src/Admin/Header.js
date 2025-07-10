import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <>
    <div className="head" >
      <ul className="nav justify-content-end  bg-dark ">
        <li className="nav-item">
          <a className="nav-link textdecoration-none" href="/">
            <i className="fa-solid fa-bell"></i>
          </a>
        </li>

        <li className="nav-item  ">
          <a
            className="nav-link dropdown-toggle textdecoration-none text-white "
            href="/"
            id="navbarDarkDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
           Username
           
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="navbarDarkDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item textdecoration-none" href="/">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Another action
              </a>
            </li>
          </ul>
        </li>
      </ul>
      </div>
    </>
  );
}
