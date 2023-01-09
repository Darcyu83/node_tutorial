const fs = require("fs");

console.log("before ::", process.memoryUsage().rss);

const fileData = fs.readFileSync("./big.txt");
fs.writeFileSync("./big1.txt", fileData);

console.log("buffer: ", process.memoryUsage().rss);
