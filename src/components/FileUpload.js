import React, { useState, useRef } from "react";
import PleaseWait from "../helpers/PleaseWait/PleaseWait";

export default function FileUpload(props) {
  //const [filename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [results, setResults] = useState("");
  const [showPleaseWait, setShowPleaseWait] = useState(false);
  const [file, setFile] = useState(null);

  const fileInput = useRef(null);

  const ImageInput = ({ file, setFile }) => {
    const onChange = async (e) => {
      console.log(`ImageInput onChange Called`);
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    };
    return <input type="file" name="image" onChange={onChange} />;
  };

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

    const output = await fetch(`${props.apiUrl}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((results) => {
        console.log(`Results = ${results.results}`);
        setResults(results.results);
        setShowPleaseWait(false);
      })
      .catch((err) => console.log(`ERROR: ${err}`));
  };

  return (
    <div className="file_upload_container">
      <form className="form_container">
        <section className="content">
          <h2>File Upload Form</h2>
          <p>
            <label htmlFor="file">Select a File to Upload:</label>
          </p>
          <input type="file" id="file" name="file" onChange={onChange} />
          <label htmlFor="image">Select and image to upload:</label>
          <input
            type="file"
            name="image"
            ref={fileInput}
            onChange={onChange}
            style={{ display: "none" }}
          />
          <button
            className="upload-btn"
            onClick={() => fileInput.current.click()}
          >
            Choose File
          </button>
        </section>
        <section className="results">
          <PleaseWait showMe={showPleaseWait} />
          {results}
        </section>
        <section className="controls">
          <button type="button" onClick={uploadFile}>
            Upload File
          </button>
          <button type="button" onClick={clearEntry}>
            Clear Entry
          </button>
        </section>
      </form>
    </div>
  );
}
