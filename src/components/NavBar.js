import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navContent">
      <section>
        <ul className="navLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/FileList">File List</Link>
          </li>
          <li>
            <Link to="/FileUpload">File Upload</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};
