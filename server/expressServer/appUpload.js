const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");
app.use(morgan("dev"));

const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// body-parser : x-www-form-urlencoded
app.use(express.json(), express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`[ uploadApp.js ]:: Before: `);
  next();
});

// app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/index.html"));
});

// app.post("/upload", upload.single("image"), (req, res) => {
app.post("/upload", upload.array("image"), (req, res) => {
  // console.log(`[ uploadApp.js ]:: file upload : `, req.file, req.body);
  console.log(`[ uploadApp.js ]:: file upload : `, req.files, req.body);
  return res.status(201);
});

app.use((err, req, res, next) => {
  console.log(`[ uploadApp.js ]:: error: `, err);

  res.status(500).send(err.message);
});
app.listen(PORT, () => {
  console.log(`[ uploadApp.js ]:: Server's running on port:3000  : `);
});
