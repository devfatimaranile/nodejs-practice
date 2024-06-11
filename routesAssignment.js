const fs = require("fs");

// requestListener: a function that will execute for every incoming requests.
// requestListener: accepsts request and response
// createServer returns a server.
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Username</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");

    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>List of Users</title></head>");
    res.write(
      "<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
    );
    res.write("</html>");
    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    // stream of data & buffers

    // listen to certain events
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      // buffer - all the chunks
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
    });

    // Status 302 stands for redirection
    res.statusCode = 302;
    res.setHeader("Location", "/users");

    return res.end();
  }
};

// module is exposed globally by node.js
// requestHandler is being stored/registered in the exports module.
module.exports = requestHandler;
