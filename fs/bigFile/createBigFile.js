const fs = require("fs");

const writeStream = fs.createWriteStream("./big.txt");

// for (let i = 0; i <= 10000000; i++) { // 500mb 파일
for (let i = 0; i <= 100; i++) {
  writeStream.write(
    "안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다. 각오 단단히 하세요!\n"
  );
}
writeStream.end();
