import { useState, useEffect } from "react";

export default function FileLister(props) {
  const [fileName, setFileName] = useState("");
  const [fileList, setFileList] = useState([]);
  const [fileDisplay, setFileDisplay] = useState(
    <option>List is Empty</option>
  );
  useEffect(() => {
    async function fetchFileList() {
      console.log(`Calling fetchFileList`);
      // You can await here
      const response = await fetch(props.apiUrl);
      const theJson = await response.json();
      const theList = theJson.data.files.map((file, index) => {
        return (
          <option key={index} value={index}>
            {file}
          </option>
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

  return (
    <div className="file_list_container">
      <div className="dialog">
        <section className="file_select">
          <form>
            <label htmlFor="file_select">Select a file:&nbsp;</label>
            <select name="file_select" id="file_select" onChange={onChange}>
              {fileDisplay}
            </select>
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
