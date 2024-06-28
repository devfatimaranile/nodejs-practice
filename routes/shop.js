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
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  const products = adminData.products;

  // using the set defaulting templating engine.
  // no need to explicitly define the file extension
  // second parameters is injecting the data to the view
  res.render("shop", {
    prods: products,
    docTitle: "Sample Shop",
    pageTitle: "Shop",
    path: "/",
  });
});

module.exports = router;
