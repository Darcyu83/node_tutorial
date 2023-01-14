const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
dotenv.config();

const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000);

/**
 * 
// views: 템플릿 파일들이 위치한 폴더를 지정
// res.render 메서드가 이 폴더 기준으로 템플릿 엔진을 찾아서 렌더링
// eg:: res.render('admin/main')이라면 views/admin/main.pug를 렌더링

app.set("views", path.join(__dirname, "views"));

//view engine은 어떠한 종류의 템플릿 엔진을 사용할지를 나타냄

app.set("view engine", "pug");
 */

const nunjucks = require("nunjucks");

// app.set("view engine", "html");

app.set("view engine", "njk"); //nunjucks 파일 구분할려면

nunjucks.configure("views", {
  express: app,
  watch: true,
});

const PORT = app.get("port");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 미들웨어
app.use((req, res, next) => {
  console.log(`[ app.js ]:: Before Middleware Handler : `);
  next();
});

//Error 테스트
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다. `);
//   error.status = 404;
//   next(error);
// });

app.use("/", (req, res, next) => {
  console.log(`[ app.js ]:: "/" Middleware Handler : `);
  next();
});

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  //   res.status(404).send("Not Found");

  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`[ app.js ]:: Server's running on : `, PORT);
});
