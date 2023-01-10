const fs = require("fs");
const fsPromise = require("fs").promises;
const constants = require("fs").constants;

const FOLDER_PATH = "./folder";

/**
 *  fs.access(경로, 옵션, 콜백): 폴더나 파일에 접근할 수 있는지를 체크
 * F_OK는 파일 존재 여부,
 * R_OK는 읽기 권한 여부,
 * W_OK는 쓰기 권한 여부를 체크
 * 파일/폴더가 없을 때의 에러 코드는 ENOENT
 */

/**
 * fs.open(경로, 옵션, 콜백): 파일의 아이디(fd 변수)를 가져오는 메서드
 * 파일이 없다면 파일을 생성한 뒤 그 아이디를 가져옴
 * 가져온 아이디를 사용해 fs.read나 fs.write로 읽거나 쓸 수 있음
 * 두 번째 인수로 어떤 동작을 할 것인지를 설정
 * 쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a
 * w를 했으므로 파일이 없을 때 새로 만들 수 있었습니다.
 * r이었다면 에러가 발생
 */

fsPromise
  .access(FOLDER_PATH, constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject("폴더 이미 있음");
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.log("폴더 없어요. 만들게요");
      return fsPromise.mkdir(FOLDER_PATH);
    }
  })
  .then(() => {
    console.log(
      "point 1 :: 폴더가 없어서 새로 만들었거나 기존에 있었으므로 다음 절차를 진행할게요."
    );

    console.log(
      "file.js 파일을 열어요. fs.open : 파일이 엇으면 새로 공파일을 만들고 열어요.",
      'fs.open(FOLDER_PATH + "/file.js", "w") w옵션에 주의하세요.'
    );

    return fsPromise.open(FOLDER_PATH + "/file.js", "w");
  })
  .then((fd) => {
    console.log("파일이 만들었어요.", fd, "\n 파일 이름을 바꿔볼게요.");

    return fsPromise.rename(
      FOLDER_PATH + "/renamedFile2.js",
      FOLDER_PATH + "/renamedFile2.js"
    );
  })
  .then(() => {
    console.log("이름 바꿔졌어요. 글을 써봅니다. ");

    const writeStream = fs.createWriteStream(FOLDER_PATH + "/renamedFile2.js");

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
