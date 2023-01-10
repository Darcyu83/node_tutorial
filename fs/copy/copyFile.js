const fs = require("fs").promises;

fs.copyFile("./copyFile.js", "./copyFileCopied.js")
  .then(() => {
    console.log("복사완료");
  })
  .catch((err) => {
    console.log(err);
  });
