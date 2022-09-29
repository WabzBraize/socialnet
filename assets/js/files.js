const [addFileForm, fileInput, fileList] = [
  el("addFileForm"),
  el("file"),
  el("fileList"),
];

// FILE CLASS
class File {
  constructor(fileName, fileSize, dateCreated) {
    this.id = Math.random();
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dateCreated = dateCreated;
  }
}

// WHEN THE FORM IS SUBMITTED
addFileForm.addEventListener("submit", (e) => {
  let fileName, fileSize, dateCreated;
  e.preventDefault();

  fileName = file.files[0].name;
  if (fileName.length >= 12) {
    let splitName = fileName.split(".");
    fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
  }

  fileSize = (file.files[0].size / 1024).toFixed(2);

  dateCreated = new Date().toLocaleDateString();

  // Create new file object
  let newFile = new File(fileName, fileSize, dateCreated);

  addFile(newFile);
});

// FUNCTION: determine MBS OR KBS file
const mbKb = (size) =>
  size > 1024 ? (size / 1024).toFixed(2) + " MB" : size + " KB";

function addFile(file) {
  let { fileName, fileSize, dateCreated } = file;
  let fileHtml = `
                                <tr>
                                <td><i class="feather-file-text"></i></td>
                                <td>${fileName}</td>
                                <td>${mbKb(fileSize)}</td>
                                <td>${dateCreated}</td>
                            </tr>
    `;

  fileList.insertAdjacentHTML("beforeend", fileHtml);
}
