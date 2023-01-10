const http = require("http");

// 실제로 배포할 때는 80번 또는 443번 포트를 사용

const server = http.createServer((req, res) => {
  console.log("\n\n\n\n\nrequest === ", req.body);

  // Html 이고 한글 표시
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node!</h1>");
  res.end("<h1>Hello Server 보냈음</h1>");
});

server.listen(8080);

server.on("listening", () => {
  console.log("포트 8080 서버 운영중");
});

server.on("error", (err) => {
  console.log("error occured", err);
});
