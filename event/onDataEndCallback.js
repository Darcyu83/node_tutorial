const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log("event1 triggered");
});
myEvent.on("event2", () => {
  console.log("이벤트 2");
});
myEvent.on("event2", () => {
  console.log("이벤트 2 추가");
});

myEvent.emit("event1"); // 이벤트 호출
myEvent.emit("event2"); // 이벤트 호출

myEvent.once("event3", () => {
  console.log("이벤트 3 한번만 실행");
});
myEvent.emit("event3"); // 이벤트 호출
myEvent.emit("event3"); // 이벤트 호출

myEvent.on("event4", () => {
  console.log("이벤트 4");
});

myEvent.removeAllListeners("event4"); //모두 다 지움
myEvent.emit("event4"); // 실행 안 됨

const listener = () => {
  console.log("이벤트 5");
};
myEvent.on("event5", listener);
myEvent.removeListener("event5", listener); // 특정 리스너 펑션 지움
myEvent.emit("event5"); // 실행 안 됨

console.log(myEvent.listenerCount("event2"));
