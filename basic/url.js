const url = require("url");

const { URL } = url;
const myURL = new URL(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'"
);
console.log("new URL():", myURL);
console.log("url.format():", url.format(myURL));
console.log("\n------------------------------------------");
const parsedUrl = url.parse(
  "http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor"
);
console.log("url.parse():", parsedUrl);
console.log("url.format():", new URL(parsedUrl));
console.log("\n------------------------------------------");
