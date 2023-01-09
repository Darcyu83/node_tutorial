// worker_threads
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

// if (isMainThread) {
//   // 부모 쓰레드 일때
//   const worker = new Worker(__filename);

//   worker.on("message", (message) =>
//     console.log("parent worker got a message ", message)
//   );
//   worker.on("exit", (message) => console.log("parent worker exit "));
//   worker.postMessage("parent worker sent a message to " + __filename);
// } else {
//   parentPort.on("message", (message) => {
//     console.log("from parent :: ", message);
//     parentPort.postMessage("child worker sent a message");

//     //워커에서 on 메서드를 사용할 때는 직접 워커를 종료해야 한다는 점에 주의하세요. parentPort.close()를 하면 부모와의 연결이 종료됩니다
//     parentPort.close();
//   });
// }

// WorkerData 사용

if (isMainThread) {
  const threads = new Set();

  threads.add(new Worker(__filename, { workerData: { start: 1 } }));
  threads.add(new Worker(__filename, { workerData: { start: 2 } }));

  for (let worker of threads) {
    worker.on("message", (message) => {
      console.log("parent worker got a message ", message);
    });

    worker.on("exit", () => {
      threads.delete(worker);

      if (threads.size === 0) {
        console.log("job done");
      }
    });
  }
} else {
  // 워커일 때
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}
