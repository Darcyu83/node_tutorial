const fs = require("fs");

// highWaterMark 버퍼 크기 : default : 64kb -> 수정 32byte
const readStream = fs.createReadStream("./readme1.txt", { highWaterMark: 32 });
const dataBuffers = [];

readStream.on("data", (chunk) => {
  dataBuffers.push(chunk);
  console.log("dataBuffers :", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log("end :", Buffer.concat(dataBuffers).toString());
});

readStream.on("error", (err) => {
  console.log("error :", err);
});
