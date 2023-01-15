var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");

var qs = require("querystring");

const PATH_FRONT = path.join(__dirname, "views");
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryObj = url.parse(_url, true).query;

  //   console.log(_url);
  //   console.table(queryObj);
  if (_url == "/") _url = "/index.html";
  if (_url.endsWith("html")) {
    response.writeHead(200);
    return response.end(fs.readFileSync(PATH_FRONT + _url));
  }

  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }

  if (_url == "/login") {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      body = qs.parse(body);
      console.log("1111 ", body, body.id, body.pwd);
      response.writeHead(200);
      response.end("success");
    });

    console.log("2222 ", body);
    return;
  }

  console.log(PATH_FRONT + _url);
});
app.listen(3000);
