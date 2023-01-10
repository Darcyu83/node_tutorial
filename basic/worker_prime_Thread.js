const {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;

  let end = start + range;
  console.log("findPrimes", start, range, end);

  for (let i = start; i < end; i++) {
    //소수인지 판단
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
      }
    } //j 포문 끝

    // 소수인 경우 배열에 담기
    if (isPrime) {
      primes.push(i);
    }

    //플래그 초기화
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 100;
  // const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.time("prime");
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: { start, range: range + ((max - min + 1) % threadCount) },
    })
  );
  console.log(
    " range + ((max - min + 1) % threadCount)",
    range,
    range + ((max - min + 1) % threadCount)
  );
  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    });
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
