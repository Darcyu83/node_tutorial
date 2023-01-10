// function _1() {
//   _2();
//   console.log("맨마지막 실행");
// }
// function _2() {
//   _3();
//   console.log("두번째로 실행");
// }
// function _3() {
//   console.log("첫번째로 실행");
// }

// _1();

// setTimeout
// function _1_1() {
//   setTimeout(_2_2, 0);
//   console.log("_1_1 맨마지막 실행 => setTimeout으로 먼저 실행됨");
// }

// function _2_2() {
//   setTimeout(_3_3, 0);
//   console.log("_2_2 두번째로 실행  => setTimeout으로 먼저 실행됨");
// }

// function _3_3() {
//   console.log("_3_3 첫번째로 실행");
// }

// _1_1();
