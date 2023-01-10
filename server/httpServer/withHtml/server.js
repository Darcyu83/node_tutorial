const http = require("http");
const fs = require("fs").promises;

// 실제로 배포할 때는 80번 또는 443번 포트를 사용

const server = http.createServer(async (req, res) => {
  // Html 이고 한글 표시
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  try {
    const data = await fs.readFile("./content.html");
    res.end(data);
  } catch (error) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(error.message);
  }
});

server.listen(8080);

server.on("listening", () => {
  console.log("포트 8080 서버 운영중");
});

server.on("error", (err) => {
  console.log("error occured", err);
});
