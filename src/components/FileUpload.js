import React, { useState, useRef } from "react";
import PleaseWait from "../helpers/PleaseWait/PleaseWait";
import CHATList from "../helpers/CHATList";

export default function FileUpload(props) {
  //const [filename, setFilename] = useState("");
  const FILELIMIT = 10;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState("");
  const [showPleaseWait, setShowPleaseWait] = useState(false);
  const fileInputRef = useRef();

  const onChange = (event) => {
    //console.log(
    //  `onChange = ${event.target.value}, files = ${event.target.files.length}`
    //);
    setResults(``);
    let newFiles = [];
    for (let file of event.target.files) {
      if (newFiles.length + selectedFiles.length < FILELIMIT) {
        newFiles.push(file);
      } else {
        setResults(`This app allows a maximum of ${FILELIMIT} files`);
        break;
      }
    }
    setSelectedFiles([...selectedFiles, ...newFiles]);
  };
  const triggerFiles = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const clearEntry = () => {
    setSelectedFiles([]);
    fileInputRef.current.value = "";
    setResults(``);
  };

  const removeAttachment = (indexToRemove) => {
    const updatedSelectedFiles = selectedFiles.filter(
      (item, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedSelectedFiles);
    setResults(`Selection was removed.`);
  };

  const uploadFile = async () => {
    if (selectedFiles && selectedFiles.length) {
      setResults("");
      setShowPleaseWait(true);
      const formData = new FormData();

      for (let file of selectedFiles) {
        //console.log(`FILE ADDED`);
        formData.append("file", file);
      }

      await fetch(`${props.apiUrl}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((results) => {
          clearEntry();
          setResults(results.results);
          setShowPleaseWait(false);
        })
        .catch((err) => {
          setResults(`ERROR: ${err}`);
          setShowPleaseWait(false);
        });
    } else {
      setResults(`Please select a file`);
    }
  };

  return (
    <div className="file_upload_container">
      <form className="form_container">
        <section className="content">
          <span className="centered">
            <h2>File Upload Form</h2>
          </span>
          <p>
            <label htmlFor="file_to_upload"></label>
          </p>
          <input
            type="file"
            className="file_to_upload"
            id="file_to_upload"
            name="file_to_upload"
            ref={fileInputRef}
            onChange={onChange}
            multiple
          />
          <section className="file_list">
            <CHATList
              files={selectedFiles}
              removeAttachment={removeAttachment}
            />
          </section>
          <button className="btn_green" type="button" onClick={triggerFiles}>
            Browse Files
          </button>
        </section>
        <section className="results">
          <PleaseWait showMe={showPleaseWait} />
          {results}
        </section>
        <section className="controls">
          <button className="btn_green" type="button" onClick={uploadFile}>
            Upload File
          </button>
          <button className="btn_green" type="button" onClick={clearEntry}>
            Clear All
          </button>
        </section>
      </form>
    </div>
  );
}
