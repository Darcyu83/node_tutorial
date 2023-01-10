const os = require("os");

// console.log("\n운영체제 정보---------------------------------");
// console.log("os.arch():", os.arch());
// console.log("os.platform():", os.platform());
// console.log("os.type():", os.type());
// console.log("os.uptime():", os.uptime());
// console.log("os.hostname():", os.hostname());
// console.log("os.release():", os.release());

// console.log("\n경로------------------------------------------");
// console.log("os.homedir():", os.homedir());
// console.log("os.tmpdir():", os.tmpdir());

// console.log("\ncpu 정보--------------------------------------");
// console.log("os.cpus():", os.cpus());
// console.log("os.cpus().length:", os.cpus().length);

// console.log("\n메모리 정보-----------------------------------");
// console.log("os.freemem():", os.freemem());
// console.log("os.totalmem():", os.totalmem());

const path = require("path");

const string = __filename;
// console.log("path.sep:", path.sep);
// console.log("path.delimiter:", path.delimiter);
// console.log("\n------------------------------------------");
// console.log("path.dirname():", path.dirname(string));
// console.log("path.extname():", path.extname(string));
// console.log("path.basename():", path.basename(string));
// console.log(
//   "path.basename - extname:",
//   path.basename(string, path.extname(string))
// );
// console.log("\n------------------------------------------");
// console.log("path.parse()", path.parse(string));
// console.log(
//   "path.format():",
//   path.format({
//     dir: "C:\\users\\zerocho",
//     name: "path",
//     ext: ".js",
//   })
// );
// console.log(
//   "path.normalize():",
//   path.normalize("C://users\\\\zerocho\\path.js")
// );
// console.log("\n------------------------------------------");
// console.log("path.isAbsolute(C:\\):", path.isAbsolute("C:\\"));
// console.log("path.isAbsolute(./home):", path.isAbsolute("./home"));

// console.log("\n------------------------------------------");
// console.log(
//   "path.relative():",
//   path.relative("C:\\users\\zerocho\\path.js", "C:\\")
// );
// console.log(
//   "path.join():",
//   path.join(__dirname, "..", "..", "/users", ".", "/zerocho")
// );
// console.log(
//   "path.resolve():",
//   path.resolve(__dirname, "..", "users", ".", "/zerocho")
// );

console.log("require.main", require.main);

console.log("path.posix.join::", path.posix.join("하하", "히히"));
console.log("path.win32.join::", path.win32.join("하하", "히히"));
