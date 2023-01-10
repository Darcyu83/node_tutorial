const http = require("http");

const fs = require("fs").promises;

const users = {};
const CONTENT_TYPE_HTML = { "Content-Type": "text/html; charset=utf-8" };
const CONTENT_TYPE_PLAIN = { "Content-Type": "text/plain; charset=utf-8" };
const server = http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    // GET
    if (req.method === "GET") {
      if (req.url === "/") {
        const data = await fs.readFile("./front/restFront.html");
        res.writeHead(200, CONTENT_TYPE_HTML);
        return res.end(data);
      } else if (req.url === "/about") {
        const data = await fs.readFile("./front/about.html");
        res.writeHead(200, CONTENT_TYPE_HTML);
        return res.end(data);
      } else if (req.url === "/users") {
        res.writeHead(200, CONTENT_TYPE_PLAIN);
        return res.end(JSON.stringify(users));
      }

      // 주소가 /도 /about도 아니면
      // 주소 / 호출시 아래 두파일도 같이 호출
      // GET /restFront.css
      // GET /restFront.js

      try {
        const data = await fs.readFile(`./front${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    }

    // POST
    if (req.method === "POST") {
      if (req.url === "/user") {
        let body = "";
        // 요청의 body를 스트림 형식으로 받음

        req.on("data", (data) => {
          console.log("File::restServer.js: data == ", data);
          body += data;
        });

        return req.on("end", () => {
          console.log("File::restServer.js: Post 본문", body);

          const { name } = JSON.parse(body);

          const id = Date.now();
          users[id] = name;
          res.writeHead(201);

          console.log("File::restServer.js: 등록후 users", users);
          return res.end("등록 성공");
        });
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        let body = "";

        req.on("data", (data) => {
          body += data;
        });
        return req.on("end", () => {
          console.log("PUT 본문(Body):", body);
          users[key] = JSON.parse(body).name;
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        delete users[key];

        return res.end(JSON.stringify(users));
      }
    }

    res.writeHead(404);
    return res.end("NOT FOUND");
  } catch (error) {
    console.log("File::restServer.js:error ==", error);
  }
});

server.listen(8080);

server.on("listening", () => {
  console.log("서버 구동 중 :: 8080");
});

server.on("error", (err) => {
  console.error(err);
  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(err.message);
});
