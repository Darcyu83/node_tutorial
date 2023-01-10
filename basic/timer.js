const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않습니다");
}, 3000);

// const immediate =
setImmediate(() => {
  console.log("즉시 실행"); // 1
});

const immediate2 = setImmediate(() => {
  console.log("실행되지 않습니다");
});

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

clearImmediate(immediate2); // 컴파일 되면서 immediate2 바로 취소함.
