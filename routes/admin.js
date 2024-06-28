const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
// mini express app tied to the other express app
const router = express.Router();

// holds the products data
const products = [];

// default method is for use is get.
// top to bottom read
// this will not go to the next middleware since there is no next().
// GET
router.get("/add-product", (req, res, next) => {
  //   res.send(
  //     "<body><form action='/admin/add-product' method='POST'><input type='text' name='title' /><button type='submit'>Add Product</button></form></body>"
  //   );

  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
});

// filter incoming post request.
// POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
