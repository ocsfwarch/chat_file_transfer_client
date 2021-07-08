import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CHATList(props) {
  let theList = null;

  if (props.files && props.files.length) {
    theList = props.files.map((file, index) => {
      return (
        <li key={index} className="attachmentItem">
          <section className="attachmentName">{file.name}</section>
          <FontAwesomeIcon
            className="removeAttachment"
            icon={["fas", "times-circle"]}
            title="Remove selected file"
            onClick={(e) => {
              props.removeAttachment(index);
            }}
          />
        </li>
      );
    });
  } else {
    theList = (
      <li>
        <div className="attachmentItem">
          <span>No file selected</span>
        </div>
      </li>
    );
  }
  /* This is for arrays of files.
  const theList = props.files.map((file) => {
    return (
      <li>
        <div className="attachmentItem">
          <span>{file.name}</span>
          <FontAwesomeIcon
            className="removeAttachment"
            icon={["fas", "times-circle"]}
          />
        </div>
      </li>
    );
  });
  */
  /*
  if (props.files && props.files.name) {
    theList = (
      <li>
        <div className="attachmentItem">
          <span>{props.files.name}</span>
          <FontAwesomeIcon
            className="removeAttachment"
            icon={["fas", "times-circle"]}
            onClick={props.removeAttachment}
          />
        </div>
      </li>
    );
  } else {
    theList = (
      <li>
        <div className="attachmentItem">
          <span>No file selected</span>
        </div>
      </li>
    );
  }*/
  return <ul>{theList}</ul>;
}
