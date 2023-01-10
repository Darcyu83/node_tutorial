process.on("uncaughtException", (error) => {
  console.log("예기치 못한 에러");
});
setInterval(() => {
  throw new Error("서버를 고장내주마!");
}, 1000);

setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
