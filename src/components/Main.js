import FileLister from "./FileLister";
import FileViewer from "./FileViewer";

export default function Main(props) {
  return (
    <div className="main_file_viewer_container">
      <FileLister apiUrl={props.apiUrl} updateFileName={props.updateFileName} />
      <FileViewer apiUrl={props.apiUrl} fileName={props.fileName} />
    </div>
  );
}
