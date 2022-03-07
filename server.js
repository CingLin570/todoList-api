const http = require("http");
const errorHandle = require("./errorHandle");
const { v4: uuidv4 } = require("uuid");
const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};
const todos = [];
const reqestListener = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    console.log(chunk);
    body += chunk;
  });
  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", data: todos }, null, 2));
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          todos.push({
            title: title,
            id: uuidv4(),
          });
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({ status: "success", data: todos }, null, 2)
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (err) {
        errorHandle(res);
      }
    });
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    const index = todos.findIndex((todo) => {
      return todo.id == id;
    });
    if (index !== -1) {
      todos.splice(index, 1);
      res.writeHead(200, headers);
      res.write(JSON.stringify({ status: "success", data: todos }, null, 2));
      res.end();
    } else {
      errorHandle(res);
    }
  } else if (req.url == "/todos" && req.method == "DELETE") {
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(JSON.stringify({ status: "success", data: todos }, null, 2));
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const id = req.url.split("/").pop();
        const index = todos.findIndex((todo) => {
          return todo.id == id;
        });
        const title = JSON.parse(body).title;
        if (index !== -1 && title !== undefined) {
          todos[index].title = title;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({ status: "success", data: todos }, null, 2)
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (err) {
        errorHandle(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({ status: "false", data: "not found 404" }, null, 2)
    );
    res.end();
  }
};
const server = http.createServer(reqestListener);
server.listen(process.env.PORT || 3005);
