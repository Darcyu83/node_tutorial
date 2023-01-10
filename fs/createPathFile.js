const fs = require("fs");
const fsPromise = require("fs").promises;
const constants = require("fs").constants;

const folderPath = "./folder";
fsPromise
  .access(folderPath, constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject("폴더 이미 있음");
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.log("폴더 없어요. 만들게요");
      return fsPromise.mkdir(folderPath);
    }
  })
  .then(() => {
    console.log(
      "point 1 :: 폴더가 없어서 새로 만들었거나 기존에 있었으므로 다음 절차를 진행할게요."
    );

    console.log(
      "file.js 파일을 열어요. fs.open : 파일이 엇으면 새로 공파일을 만들고 열어요.",
      'fs.open(folderPath + "/file.js", "w") w옵션에 주의하세요.'
    );

    return fsPromise.open(folderPath + "/file.js", "w");
  })
  .then((fd) => {
    console.log("파일이 만들었어요.", fd, "\n 파일 이름을 바꿔볼게요.");

    return fsPromise.rename(
      folderPath + "/renamedFile2.js",
      folderPath + "/renamedFile2.js"
    );
  })
  .then(() => {
    console.log("이름 바꿔졌어요. 글을 써봅니다. ");

    const writeStream = fs.createWriteStream(folderPath + "/renamedFile2.js");

    writeStream.on("finish", () => {
      console.log("writeStream finished");
    });

    writeStream.write("아무글자나 입력 등록 ");

    writeStream.end();
  })
  .catch((err) => {
    console.log("acceess 후 발생하는 모든 에러는 여기서 처리해요.", err);
  });

// fs.access("./fsAccess", constants.F_OK | constants.W_OK | constants.R_OK);
//   .then(() => {
//     return Promise.reject("폴더 이미 있음");
//   })
//   .catch((err) => {
//     console.log(err);

//     if (err.code === "ENOENT") {
//       console.log("폴더 없음");
//       return fs.mkdir("./fsAccess");
//     }
//   })
//   .then(() => {
//     console.log("폴더 생성됨");
//     return fs.open("./fsAccess/file.js", "w");
//   })
//   .then((fd) => {
//     console.log("빈파일 만들기 성공", fd);
//     fs.rename("./fsAccess/file.js", "./fsAccess/renamed.js");
//   })
//   .then(() => {
//     console.log("이름 바꿔짐");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
