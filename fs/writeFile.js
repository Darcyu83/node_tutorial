const fs = require("fs").promises;

fs.writeFile("./readme1.txt", "이것은 컨텐츠")
  .then(() => {
    return fs.readFile("./readme1.txt");
  })
  .then((data) => console.log("readme1 data 읽어온거 ", data.toString()))
  .catch((err) => {
    console.error(err);
  });
