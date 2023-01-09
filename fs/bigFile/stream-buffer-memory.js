const fs = require("fs");

console.log("before :: ", process.memoryUsage().rss);
const readStream = fs.createReadStream("./big.txt", {
  highWaterMark: 1024 * 1024,
});

const writeStream = fs.createWriteStream("./big2.txt");
readStream.pipe(writeStream);

readStream.on("end", () => {
  console.log("after :: ", process.memoryUsage().rss);
});

before = 20533248; // 비슷함
before = 20623360; // 비슷함

buffer = 574099456; // 574MB 파일 전체크기가 메모리에 잡힘
buffer = 25751552; // 메모리에 잡힌 파일크기가 현저히 작음
