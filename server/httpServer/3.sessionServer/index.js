const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const querystring = require("querystring");

const parseCookieString = (cookies = "") => {
  const _cookies = cookies.split(";").map((cookie) => cookie.split("="));

  const containerOrVar = {};

  const cookiesObj = _cookies.reduce((container, [k, v]) => {
    container[k.trim()] = decodeURIComponent(v);
    return container;
  }, containerOrVar);

  return cookiesObj;
};

const session = {};

const server = http.createServer(async (req, res) => {
  const cookieStr = req.headers.cookie;
  const requestUrl = req.url.trim();

  const cookies = parseCookieString(cookieStr);

  console.log(`[ sessionServer.js ]::  : `, `${requestUrl}`, req.method);
  console.table(session);

  if (requestUrl.startsWith("/favicon.ico")) {
    return;
  }

  // 로그인
  if (requestUrl.startsWith("/login")) {
    const { query } = url.parse(requestUrl); // 쿼리 스트링 추출
    const { name } = querystring.parse(query); // 쿼리스 스트리 to object

    const expires = new Date();

    expires.setMinutes(expires.getMinutes() + 5); // 5분 후 만기

    const sessionId = Date.now();

    // 세션에 추가

    session[sessionId] = {
      name,
      expires,
    };

    cookies.session && session[cookies.session]?.expires > new Date();

    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `session=${sessionId}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });

    res.end();
  } else if (
    cookies.session &&
    session[cookies.session]?.expires > new Date()
  ) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile("../front/cookieSessionFront.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.message);
    }
  }
});

server.listen(8080);

server.on("listening", () => {
  console.log("[ sessionServer.js ]:: Server's running on port:8080 : ");
});

server.on("error", (err) => {
  console.log("[ sessionServer.js ]::  err: ", err);
});
