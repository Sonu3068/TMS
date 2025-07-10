import React from "react";

export default function Header() {
  return (
    <>
    <div >
      <ul className="nav justify-content-end  bg-dark ">
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i className="fa-solid fa-bell"></i>
          </a>
        </li>

        <li className="nav-item dropdown ">
          <a
            className="nav-link dropdown-toggle"
            href="/"
            id="navbarDarkDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Username
            {/* <p>User.role</p> */}
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="navbarDarkDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="/">
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
