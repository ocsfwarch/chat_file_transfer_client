import { useState, useEffect } from "react";

export default function FileViewer(props) {
  const [display, setDisplay] = useState("");
  //const [fileWasUpdated, setFileWasUpdated] = useState(false);
  useEffect(() => {
    async function downloadFile() {
      console.log(`rendering fileViewer`);
      const output = await fetch(`${props.apiUrl}/view/${props.fileName}`)
        .then((results) => results.json())
        .then((data) => {
          return data.data;
        })
        .catch((err) => console.log(`ERROR: ${err}`));
      //console.log(`Results = ${output}`);
      //setFileWasUpdated(false);
      setDisplay(output);
    }
    if (props.fileName) {
      downloadFile();
    }
  }, [props]);

  const updateDisplay = (event) => {
    event.preventDefault();
    //setFileWasUpdated(true);
    setDisplay(event.target.value);
  };

  return (
    <div className="file_viewer_container">
      <section className="controls"></section>
      <section className="display">
        <div className="text_display" onChange={updateDisplay}>
          {display}
        </div>
      </section>
      <section className="status"></section>
    </div>
  );
}
