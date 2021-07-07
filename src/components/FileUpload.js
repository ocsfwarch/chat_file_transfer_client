import React, { useState, useRef } from "react";
import PleaseWait from "../helpers/PleaseWait/PleaseWait";
import CHATList from "../helpers/CHATList";

export default function FileUpload(props) {
  //const [filename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [results, setResults] = useState("");
  const [showPleaseWait, setShowPleaseWait] = useState(false);
  const fileInputRef = useRef();

  const onChange = (event) => {
    console.log(
      `onChange = ${event.target.value}, files = ${event.target.files.length}`
    );
    setResults(``);
    setSelectedFile(event.target.files[0]);
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
  };
  const triggerFiles = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const clearEntry = () => {
    setSelectedFile(null);
    setSelectedFiles([]);
    fileInputRef.current.value = "";
    setResults(``);
  };

  const removeAttachment = (index) => {
    //event.preventDefault();
    console.log(`removeAttachment == ${index}`);
    //for (let x in event.target) {
    //  console.log(`x = ${x}`);
    //}
  };
  const uploadFile = async () => {
    if (selectedFile) {
      setResults("");
      setShowPleaseWait(true);
      const formData = new FormData();

      for (let file of selectedFiles) {
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
          />
          <CHATList files={selectedFiles} removeAttachment={removeAttachment} />
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
            Clear Entry
          </button>
        </section>
      </form>
    </div>
  );
}
