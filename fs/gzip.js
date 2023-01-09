const zlib = require("zlib");

const fs = require("fs");

const readStream = fs.createReadStream("./writeStreamCopied.txt", {
  highWaterMark: 16,
});

const zlibStream = zlib.createGzip();

const writeStream = fs.createWriteStream("./writeStreamCopied.txt.gz");

readStream.pipe(zlibStream).pipe(writeStream);
