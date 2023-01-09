const fs = require("fs");

const readStream = fs.createReadStream("./writeStream.txt", {
  highWaterMark: 16,
});

const writeStream = fs.createWriteStream("writeStreamCopied.txt");

readStream.pipe(writeStream);
