import { useState, useEffect } from "react";

export default function FileLister(props) {
  const [showList, setShowList] = useState(false);
  const [fileName, setFileName] = useState("TEST");
  const [fileList, setFileList] = useState([]);
  const [fileDisplay, setFileDisplay] = useState(<li>List is Empty</li>);
  const [fileSelect, setFileSelect] = useState("");

  useEffect(() => {
    async function fetchFileList() {
      console.log(`Calling fetchFileList`);
      // You can await here
      const response = await fetch(props.apiUrl);
      const theJson = await response.json();
      const theList = theJson.data.files.map((file, index) => {
        return (
          <li key={index} value={index}>
            {file}
          </li>
        );
      });
      setFileList(theJson.data.files);
      setFileDisplay(theList);
    }
    fetchFileList();
  }, [props.apiUrl]);

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

  const onChange = (event) => {
    setFileName(fileList[event.target.value]);
  };

  const displaySelect = (event) => {
    event.preventDefault();
    console.log(`BEFORE ${showList}`);
    if (showList) {
      setFileSelect("");
    } else {
      setFileSelect(fileDisplay);
    }
    setShowList(!showList);
    console.log(`AFTER ${showList}`);
  };

  return (
    <div className="file_list_container">
      <div className="dialog">
        <section className="file_select">
          <form>
            <label htmlFor="file_select">Select a file:&nbsp;</label>
            <input
              type="text"
              onClick={displaySelect}
              value={fileName}
              readOnly
            ></input>
            <section className="fileListDiv">
              <ul>{fileSelect}</ul>
            </section>
          </form>
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
