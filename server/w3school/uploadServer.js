var http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
http
  .createServer(function (req, res) {
    if (req.url == "/fileupload") {
      const form = new formidable.IncomingForm();

      form.parse(req, function (err, fields, files) {
        const oldpath = files.filetoupload.filepath;
        const newpath = path.join(
          __dirname,
          files.filetoupload.originalFilename
        );

        console.log(`[ uploadServer.js ]::  oldpath: `, `${oldpath}`);
        console.log(`[ uploadServer.js ]::  newpath: `, `${newpath}`);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;

          res.write("File Uploaded and moved");
          res.end();
        });
      });
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      '<form action="fileupload" method="post" enctype="multipart/form-data">'
    );
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write("</form>");
    return res.end();
  })
  .listen(3000);
