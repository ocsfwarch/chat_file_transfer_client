import FileLister from "./FileLister";
import FileViewer from "./FileViewer";

export default function FileList(props) {
  return (
    <div className="main_file_viewer_container">
      <FileLister
        apiUrl={props.apiUrl}
        apiToken={props.apiToken}
        updateFileName={props.updateFileName}
      />
      <FileViewer
        apiUrl={props.apiUrl}
        apiToken={props.apiToken}
        fileName={props.fileName}
      />
    </div>
  );
}
