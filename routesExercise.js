const fs = require("fs");

// requestListener: a function that will execute for every incoming requests.
// requestListener: accepsts request and response
// createServer returns a server.
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");

    return res.end();
  }

  if (url === "/message" && method === "POST") {
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
      fs.writeFileSync("message.txt", message);
    });

    // Status 302 stands for redirection
    res.statusCode = 302;
    res.setHeader("Location", "/");

    return res.end();
  }

  // sending data to the client.
  // attach a header to the response passing meta information:
  // the type of the content is html <"text/html">
  res.setHeader("Content-Type", "text/html");

  // write lines of response.
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my first Node.js Server!</h1></body>");
  res.write("</html>");
  res.end(); // cannot write after ending the response.
};

// module is exposed globally by node.js
// requestHandler is being stored/registered in the exports module.
module.exports = requestHandler;
