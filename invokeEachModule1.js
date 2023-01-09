const dep2 = require("./invokeEachModule2");
console.log("require invokeEachModule2", dep2);
module.exports = () => {
  console.log("dep1", dep2);
};
