const path = require("path");
// backend framework for nodejs
// all about middleware
const express = require("express");
const bodyParser = require("body-parser");

// create an express application
// a valid request handler
const app = express();

// own router
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const usersRoutes = require("./routes/users");

// register a middleware that will parse the request body;
// it will only parse request from a form body;
app.use(bodyParser.urlencoded({ extended: false }));

// serves static files
app.use(express.static(path.join(__dirname, "public")));

// passing the custom routes to the express app
// can also explicitly add common route
app.use("/admin", adminRoutes);

// allows to add middleware function
// accepts array of request handler
// will be executed for every incoming request
// req, res
// "next" a function will be passed to the use method. Allow the request to travel on to the next middleware.
app.use((req, res, next) => {
  // send a response if you want to end the call
  // if app doesn't send a response or fire a next function the current middleware will die.
  next(); // travels next to the next middleware function.
});

app.use(shopRoutes);
app.use(usersRoutes);
// send 404 error page
// catch all middleware
app.use((req, res, next) => {
  // chaining status with send as response
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8080);
