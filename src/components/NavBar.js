import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navContent">
      <section>
        <ul className="navLinks">
          <li>
            <Link to="/">File List</Link>
          </li>
          <li>
            <Link to="/FileUpload">File Upload</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};
