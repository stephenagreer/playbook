/* eslint-disable react/no-multi-comp */

import React, { useState } from "react";
import { FileUpload, List, ListItem } from "playbook-ui";

const AcceptedFilesList = ({ files }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}>{file.name}</ListItem>
    ))}
  </List>
);

const FileUploadCustomDescription = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files]);
  };

  return (
    <div>
      <AcceptedFilesList
          files={filesToUpload}
          {...props}
      />
      <FileUpload
          accept={['application/pdf','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
          acceptedFilesDescription="Adobe (.pdf) and Microsoft (.xslx)"
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  );
};

export default FileUploadCustomDescription;
