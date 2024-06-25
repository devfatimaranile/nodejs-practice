const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

// import product data from admin
const adminData = require("./admin");

const router = express.Router();

// first argument is the path
// using "get" makes an exact matching of the path
router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello from Express!</h1>");

  // sending file to the client/browser
  // dirname = global variable that holds the absolute path of the project where it is being used which is "routes"
  // ../ go up one level
  console.log("products", adminData.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
