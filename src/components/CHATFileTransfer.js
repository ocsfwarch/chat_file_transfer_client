import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Redirect,
} from "react-router-dom";
import { Header } from "./Header";
import Home from "./Home";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

// Font Awesome Imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function CHATFileTransfer() {
  const [fileName, setFileName] = useState("");
  const updateFileName = (newFileName) => {
    console.log(`FILENAME = ${newFileName}`);
    setFileName(newFileName);
  };
  const API_URL = "http://localhost:5007/files";

  return (
    <Router>
      <div className="app_container">
        <Header />
        <Switch>
          <Route
            path="/FileUpload"
            render={(props) => <FileUpload {...props} apiUrl={API_URL} />}
          />
          <Route
            exact
            path="/FileList"
            render={(props) => (
              <FileList
                {...props}
                apiUrl={API_URL}
                updateFileName={updateFileName}
                fileName={fileName}
              />
            )}
          />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default CHATFileTransfer;
