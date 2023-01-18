/**
 * npm i
 * express
 * express - session
 * morgan
 * cookie - parser
 * dotenv
 * body-parser : 필요한 경우
 * npm i express express-session morgan cookie-parser dotenv
 */

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

const PORT = app.get("port");

// [HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]
// GET / 500 12.107 ms - 50 요청 정보를 로그로 찍어줌
app.use(morgan("dev")); // dev
// app.use(morgan("combined")); // production

// app.use('요청 경로', express.static('실제 경로'));
// 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정
// public/stylesheets/style.css는 http://localhost:3000/stylesheets/style.css로 접근할 수 있음
// public 폴더를 만들고 css나 js, 이미지 파일들을 public 폴더에 넣으면 브라우저에서 접근할 수 있게 됨
app.use("/", express.static(path.join(__dirname, "public")));

// body-parser 미들웨어의 일부 기능이 익스프레스에 내장됨 over express 4.16.0
// body-parser : 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
// 단, 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못함. 그 경우에는 multer 모듈을 사용
// body-parser를 직접 설치해야 하는 경우도 있습니다. body-parser는 JSON과 URL-encoded 형식의 데이터 외에도 Raw, Text 형식의 데이터를 추가로 해석할 수 있음
// Raw는 요청의 본문이 버퍼 데이터일 때, Text는 텍스트 데이터일 때 해석하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// body-parser
// const bodyParser = require("body-parser");
// app.use(bodyParser.raw());
// app.use(bodyParser.text());

app.use(cookieParser(process.env.COOKIE_SECRET));

/**
쿠키 추가
res.cookie('name', 'zerocho', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true,
  secure: true,
});

쿠키 삭제
res.clearCookie('name', 'zerocho', { httpOnly: true, secure: true });

*/

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 2,
    },

    name: "session-cookie",
  })
);

// 미들웨어 설정  app.use(**미들웨어**);
// case1 app.use(**(req, res, next) => {}**); next를 가짐
// case2 app.get(url , **미들웨어** , 핸들러)
// case1
app.use((req, res, next) => {
  console.log(`[ app.js ]:: 모든 요청에 다 실행되는 미들웨어 입니다.: `);

  res.locals.data = { test: "테스트 " };
  next(); // 넥스트를 실행안하면 다음 단계로 안넘어감.
});

// case2
app.get(
  "/",
  (req, res, next) => {
    console.log(`[ app.js ]:: get("/")의 미들웨어 실행됨: `, res.locals.data);

    console.log("middleware session info ===", req.session, res.session);

    next();
  },
  (req, res) => {
    console.log(
      `[ app.js ]:: Handler 실행됨 : `,
      `${path.join(__dirname, "./index.html")}`
    );

    // throw new Error("에러는 에러 처리 미들웨어로 갑니다.");

    console.log("session info ===", req.session, res.session);
    res.sendFile(path.join(__dirname, "./index.html"));
  }
);

// 에러 처리 미들웨어는 최하단에
app.use((err, req, res, next) => {
  console.log(`[ app.js ]:: Error 처리 미들웨어 실행됨: `, `${err.message}`);
  res.status(500).send(err.message);
});

app.listen(PORT, (req, res) => {
  console.log(PORT, "번 포트에서 대기 중");
});
