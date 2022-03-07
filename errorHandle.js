const headers = require("./headers");

function errorHandle(res, data) {
  res.writeHead(404, headers);
  res.write(JSON.stringify({ status: "false", data }, null, 2));
  res.end();
}

module.exports = errorHandle;
