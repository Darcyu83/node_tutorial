const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   console.log(`[ user.js ]:: User Home : `, req.params, req.query);
//   res.send("Hello User Home");
// });

router
  .route("/")
  .get((req, res) => {
    console.log(`[ user.js ]:: User Home /GET: `, req.params, req.query);
    res.send("Hello User Home");
  })
  .post((req, res) => {
    console.log(`[ user.js ]:: User Home /POST: `, req.params, req.query);
    res.send("Hello User Home");
  });

router.get("/:id", (req, res) => {
  console.log(`[ user.js ]:: User id : `, req.params, req.query);
  res.send("Hello User :: id:" + req.params.id + " || " + req.query.name);
});

module.exports = router;
