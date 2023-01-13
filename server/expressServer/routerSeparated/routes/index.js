const express = require("express");
const path = require("path");

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    // next(); 다음 미들웨어 실행
    next("route"); // 미들웨어 건너띄고 라우터로 바로 직행
  },
  (req, res, next) => {
    console.log("실행되지 않습니다");
    next();
  },
  (req, res, next) => {
    console.log("실행되지 않습니다");
    next();
  }
);

router.get("/", (req, res) => {
  console.log(`[ routes/index.js  ]:: "/" Handler : `);
  res.render("index", { title: "내타이틀" });
});

module.exports = router;
