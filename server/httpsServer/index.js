const https = require("https");
const fs = require("fs");

// https.createServer({}, (req, res) => {});
const server = https.createServer(
  {
    cert: fs.readFileSync("도메인 인증서 경로"),
    key: fs.readFileSync("도메인 비밀키 경로"),
    ca: [
      fs.readFileSync("상위 인증서 경로"),
      fs.readFileSync("상위 인증서 경로"),
    ],
  },
  (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Server!</p>");
  }
);

server.listen(443); // https 배포 포트

server.on("listening", () => {
  console.log("443번 포트에서 서버 대기 중입니다!");
});
