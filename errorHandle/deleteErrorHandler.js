const fs = require("fs").promises;

// 프로미스를 사용할 때는 항상 catch를 붙여주는 것을 권장
// 노드 자체적으로 잡아주는 펑션
setInterval(() => {
  fs.unlink("anyfile.js");
}, 1000);

// setInterval(() => {
//   fs.unlink("anyfile.js", (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }, 1000);
