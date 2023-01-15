const fs = require("fs");

console.log(`[ sysnc.js ]:: 111 : `);
// const result = fs.readFileSync("readme.txt");
const result = fs.readFile("readme.txt", (err, data) => {
  console.log(`[ sysnc.js ]:: data : `, data);
});
console.log(`[ sysnc.js ]:: result : `, result);
console.log(`[ sysnc.js ]:: 222 : `);
