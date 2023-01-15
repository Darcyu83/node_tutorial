const mysql = require("mysql");
const http = require("http");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yuds",
  database: "nodejs",
});

const SELECT_USERS = `
SELECT * FROM users
`;

const INSERT_USER = `

    INSERT INTO users (name,age,married,comment) VALUES ?


`;

const users = [
  ["John", 11, 1, "john Comment"],
  ["John1", 112, 1, "john1 Comment"],
  ["John2", 113, 1, "john2 Comment"],
  ["John3", 114, 1, "john3 Comment"],
  ["John4", 115, 0, "john4 Comment"],
  ["John5", 116, 0, "john5 Comment"],
];
const user1 = [["timcook", 11, 1, "cook Comment"]];
con.connect(function (err) {
  if (err) console.log(`[ mysqlServer.js ]::  err: `, `${err}`);

  console.log("Connected");

  con.query(INSERT_USER, [user1], (err, result) => {
    //   con.query(INSERT_USER, [user1], (err, result) => {
    if (err) console.log(`[ mysqlServer.js ]:: err : `, `${err}`);
    console.log(`[ mysqlServer.js ]::  result: `, result);
  });

  con.query(
    SELECT_USERS,

    (err, result, fields) => {
      if (err) console.log(`[ mysqlServer.js ]:: err : `, `${err}`);
      // console.log(`[ mysqlServer.js ]::  result: `, result);
      console.log(`[ mysqlServer.js ]::  result: `, result);
    }
  );
});
