const dep1 = require("./invokeEachModule1");
const dep2 = require("./invokeEachModule2");
dep1();
dep2();

// 순환 참조 오류 발생
