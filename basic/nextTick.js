setImmediate(() => {
  console.log("Immediate");
});

process.nextTick(() => {
  console.log("nextTick ");
});
setTimeout(() => {
  console.log("timeout");
}, 10);
Promise.resolve().then(() => console.log("promise"));

// callStack || background || task queue || micro task queue

// micro task queue : nextTick && Promise.resolve
