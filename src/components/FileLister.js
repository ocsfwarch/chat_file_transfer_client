import React, { useState, useEffect } from "react";

export default function FileLister(props) {
  const [fileName, setFileName] = useState("TEST");
  const [fileList, setFileList] = useState([]);
  const [fileSelect, setFileSelect] = useState("");

  useEffect(() => {
    async function fetchFileList() {
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `bearer ${props.apiToken}`,
        },
      };
      const response = await fetch(props.apiUrl, options);
      const theJson = await response.json();
      const theList = theJson.data.files.map((file, index) => {
        return (
          <option key={index} value={index}>
            {file}
          </option>
        );
      });
      setFileList(theJson.data.files);
      setFileSelect(theList);
      setFileName(theJson.data.files[0]);
    }
    fetchFileList();
  }, [props.apiUrl, props.apiToken]);

  const onViewClick = (event) => {
    event.preventDefault();
    if (fileName && fileName.length) {
      props.updateFileName(fileName);
    }
  };

  /* 
    This function downloads a file from a server
    using the anchor download attribute which was 
    introduced in HTML 5. This function will dynamically
    create a url, create an anchor element, submit a click event
    on that anchor element, and finally remove the anchor element.
    */
  /*
  const onDownloadClick = (event) => {
    event.preventDefault();
    if (fileName && fileName.length) {
      // Create a new link
      const anchor = document.createElement("a");
      anchor.href = `${props.apiUrl}/download/${fileName}`;
      anchor.download = fileName;

      // Append to the DOM
      document.body.appendChild(anchor);

      // Trigger `click` event
      anchor.click();

      // Remove element from DOM
      document.body.removeChild(anchor);
    }
  };
  */

  /*
 Authorization using bearer token was added to the API server
 so I rewrote the function to send the authorization 
 credentials and still allow the user to download
 using a click
 */

  const onDownloadClick = async (event) => {
    event.preventDefault();
    if (fileName && fileName.length) {
      const options = {
        method: "GET",
        headers: {
          Authorization: `bearer ${props.apiToken}`,
        },
      };

      await fetch(`${props.apiUrl}/download/${fileName}`, options)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          const href = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = href;
          anchor.setAttribute("download", `${fileName}`);
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        })
        .catch((err) => {
          return Promise.reject({ Error: `Something went wrong`, err });
        });
    } // End if (fileName && fileName.length)
  };

  const onChange = (event) => {
    setFileName(fileList[event.target.value]);
  };

  return (
    <div className="file_list_container">
      <div className="dialog">
        <section className="file_select">
          <label htmlFor="file_select">
            Select a file:&nbsp;
            <select id="file_select" name="file_select" onChange={onChange}>
              {fileSelect}
            </select>
          </label>
        </section>
        <section className="controls">
          <button className="btn_green" type="button" onClick={onViewClick}>
            View File
          </button>
          <button className="btn_green" type="button" onClick={onDownloadClick}>
            Download File
          </button>
        </section>
      </div>
    </div>
  );
}
