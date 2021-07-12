import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home_container">
      <section className="dialog">
        <section className="header">
          Welcome to the CHAT File Manager application
        </section>
        <section className="content">
          <section className="introduction">
            The purpose of this application is to allow a user to access files
            that are stored on a Internet cloud server:{" "}
          </section>
          <ul>
            <li>View a list of remotely resourced files.</li>
            <li>View the contents of a remotely resourced file.</li>
            <li>Download a remotely resourced file.</li>
            <li>Upload a local file to a remote location.</li>
          </ul>
          <section className="introduction">
            Select <Link to="/FileList">"File List"</Link> to view the list of
            available files. <br />
            Select <Link to="/FileUpload">"File Upload"</Link> to upload a local
            file to the remote server.
          </section>
        </section>
      </section>
    </div>
  );
}
