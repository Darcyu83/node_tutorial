const fs = require("fs").promises;
const constants = require("fs").constants;

const FOLDER_PATH = "./folder";

/**
 *
 * fs.unlink(경로, 콜백): 파일을 지움
 *
 */
fs.readdir(FOLDER_PATH)
  .then((dir) => {
    console.log("폴더 내용 확인한다. ", dir);
    return fs.unlink(FOLDER_PATH + "/temp.txt");
  })
  .then(() => {
    console.log("파일 삭제 성공");
    return fs.rmdir(FOLDER_PATH);
  })
  .then(() => {
    console.log("폴더 삭제 성공");
  })
  .catch((err) => {
    console.log(err);
  });
