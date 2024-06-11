const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
// mini express app tied to the other express app
const router = express.Router();

// default method is for use is get.
// top to bottom read
// this will not go to the next middleware since there is no next().
// GET
router.get("/add-product", (req, res, next) => {
  //   res.send(
  //     "<body><form action='/admin/add-product' method='POST'><input type='text' name='title' /><button type='submit'>Add Product</button></form></body>"
  //   );

  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// filter incoming post request.
// POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
