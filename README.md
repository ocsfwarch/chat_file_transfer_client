# CHAT File Manager

The purpose of this project is to allow a user to interact with files over the Internet.

## Description

The user is presented an application which will allow them to view/edit/search file content, download file content, or upload file content. File content refers to the particular file format the user may be interacting with.

## Application Image - Home Display

![Component Layout](https://github.com/ocsfwarch/chat_file_transfer_client/blob/master/Project_Docs/app_image_1.png?raw=true)

## Application Image - FileList Display

![Component Layout](https://github.com/ocsfwarch/chat_file_transfer_client/blob/master/Project_Docs/app_image_2.png)

## Application Image - FileUpload Display

![Component Layout](https://github.com/ocsfwarch/chat_file_transfer_client/blob/master/Project_Docs/app_image_3.png?raw=true)

## Use Case 1 - View the contents of a text file.

- This use case starts when the user selects the `File List` menu item.
- The system will display a list of files available for the user to select.
- The user makes a selection from the list.
- The user presses the `View File` command button.
- The system identifies the checks if the file exists.
- The system reads the contents of the file.
- The system returns the file contents.
- This use case ends when selected file is displayed to the user.

## Use Case 1 - Download the contents of a text file.

- This use case starts when the user selects the `File List` menu item.
- The system will display a list of files available for the user to select.
- The user makes a selection from the list.
- The user presses the `Download File` command button.
- The system identifies the checks if the file exists.
- The system adds the file to the Response object download function.
- The system transfers the file as an "attachment".
- The browser receives the file.
- The browser stores the file in the system default download area.
- This use case ends when the browser shows the user the download is complete.

## Use Case 3 - Upload a file to the server

- This use case starts when the user selects the `File Upload` menu item.
- The system displays a form that allows a user to select a file for upload.
- The user presses the `Choose a File` command button.
- The user selects a file for upload from the files displayed by their device.
- The user presses the `Upload File` command button.
- The system packages the user file selection for upload.
- The system will POST the file.
- The system receives the file.
- The system verifies the file integrity.
- The system stores the file.
- The system returns a status to the user.
- This use case ends when the status is displayed to the user.

## Design and Architecture

- Component Layout Diagram
  ![Component Layout](https://github.com/ocsfwarch/chat_file_transfer_client/blob/master/Project_Docs/component_layout.png)

| Component        | Description                                          |
| ---------------- | ---------------------------------------------------- |
| CHATFileTransfer | This is the controlling component for the app        |
| Header           | The Header component displays the banner and menu    |
| NavBar           | The NavBar component contains the menu               |
| Home             | The Home component contains the Landing Page         |
| FileList         | The FileList component controls the file viewing     |
| FileLister       | The FileLister component displays the list of files  |
| FileViewer       | The FileViewer components displays the file contents |
| FileUpload       | The FileUpload component controls the file upload    |

## Testing

- Testing is performed on each of the components. Each of the component tests verifies the ability of the component to render and that each of the main sub-components are displayed. All the test files are contained in the `tests` folder.

| Module used for testing   | Version |
| ------------------------- | ------- |
| @testing-library/jest-dom | ^5.14.1 |
| @testing-library/react    | ^11.2.7 |
