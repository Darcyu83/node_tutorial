const http = require("http");

const fs = require("fs").promises;

const url = require("url");

const querystring = require("querystring");

/**
• 쿠키명=쿠키값: 기본적인 쿠키의 값입니다. mycookie=test 또는 name=zerocho와 같이 설정합니다.

• Expires=날짜: 만료 기한입니다. 이 기한이 지나면 쿠키가 제거됩니다. 기본값은 클라이언트가 종료될 때까지입니다.

• Max-age=초: Expires와 비슷하지만 날짜 대신 초를 입력할 수 있습니다. 해당 초가 지나면 쿠기가 제거됩니다. Expires보다 우선합니다.

• Domain=도메인명: 쿠키가 전송될 도메인을 특정할 수 있습니다. 기본값은 현재 도메인입니다.

• Path=URL: 쿠키가 전송될 URL을 특정할 수 있습니다. 기본값은 ‘/’이고, 이 경우 모든 URL에서 쿠키를 전송할 수 있습니다.

• Secure: HTTPS일 경우에만 쿠키가 전송됩니다.

• HttpOnly: 설정 시 자바스크립트에서 쿠키에 접근할 수 없습니다. 쿠키 조작을 방지하기 위해 설정하는 것이 좋습니다.
 */
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      console.log("\n↓↓↓↓↓↓↓↓↓↓  ↓↓↓↓↓↓↓↓↓↓ ↓↓↓↓↓↓↓↓↓↓ ↓↓↓↓↓↓↓↓↓↓\n");

      console.log("[ cookieServer.js ]::  acc: ", acc);
      console.log("[ cookieServer.js ]::  k.trim(): ", k.trim());
      console.log("[ cookieServer.js ]::  v: ", v);
      console.log(
        "[ cookieServer.js ]::  decodeURIComponent(v): ",
        decodeURIComponent(v)
      );
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

// const parseCookies = (cookie = "") =>
//   cookie
//     .split(";")
//     .map((v) => v.split("="))
//     .reduce((acc, [k, v]) => {
//       acc[k.trim()] = decodeURIComponent(v);
//       return acc;
//     }, {});

const server = http.createServer(async (req, res) => {
  console.log(
    "[ cookieServer.js ]:: createServer cookie: ",
    decodeURIComponent(req.headers.cookie)
  );
  const cookies = parseCookies(req.headers.cookie);

  if (req.url.startsWith("/login")) {
    const { query } = url.parse(req.url);
    const { name } = querystring.parse(query);

    const expires = new Date();

    // 쿠키 유효 시간을 현재 시간 + 5분 설정

    expires.setMinutes(expires.getMinutes() + 5);

    // code 302 리디렉트
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `name=${encodeURIComponent(
        name
      )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/; `,
    });

    return res.end();
  } else if (cookies.name) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${cookies.name}님 안녕하세요.`);
  } else {
    try {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      const data = await fs.readFile("../front/cookieSessionFront.html");
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  }
});

server.listen(8080);
server.on("listening", () => {
  console.log("[ cookieServer.js ]:: Server running on 8080 : ");
});
server.on("error", (error) => {
  console.log("[ cookieServer.js ]:: server error : ", error);
});
