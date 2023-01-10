const exec = require("child_process").exec;

var process = exec("dir");

process.stdout.on("data", function (data) {
  console.log("data :: ", data.toString());
});
process.stderr.on("data", function (data) {
  console.error(data.toString());
}); // 실행 에러
