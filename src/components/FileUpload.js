import React, { useState } from "react";
import PleaseWait from "../helpers/PleaseWait/PleaseWait";

export default function FileUpload(props) {
  //const [filename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [results, setResults] = useState("");
  const [showPleaseWait, setShowPleaseWait] = useState(false);

  const onChange = (event) => {
    console.log(
      `onChange = ${event.target.value}, files = ${event.target.files.length}`
    );
    //setFilename(event.target.value);
    setSelectedFile(event.target.files[0]);
  };
  const clearEntry = () => {
    //setFilename("");
    setSelectedFile(null);
  };
  const uploadFile = async () => {
    setResults("");
    setShowPleaseWait(true);
    const formData = new FormData();

    formData.append("file", selectedFile);

    await fetch(`${props.apiUrl}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((results) => {
        setResults(results.results);
        setShowPleaseWait(false);
      })
      .catch((err) => setResults(`ERROR: ${err}`));
  };

  return (
    <div className="file_upload_container">
      <form className="form_container">
        <section className="content">
          <span className="centered">
            <h2>File Upload Form</h2>
          </span>
          <p>
            <label htmlFor="input_file">Select a File to Upload:</label>
          </p>
          <input
            type="file"
            className="file_input"
            id="input_file"
            name="input_file"
            onChange={onChange}
          />
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
