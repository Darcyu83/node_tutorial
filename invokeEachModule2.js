const dep1 = require("./invokeEachModule1");
console.log("require invokeEachModule1", dep1);
module.exports = () => {
  console.log("dep1", dep1);
};
