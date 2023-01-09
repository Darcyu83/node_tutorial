const fs = require("fs");

const writeStream = fs.createWriteStream("./writeStream.txt");

writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("첫번째  ");
writeStream.write("두번째  ");
writeStream.write("세번째  ");
writeStream.end();
