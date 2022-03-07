const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

function errorHandle(res) {
  res.writeHead(404, headers);
  res.write(
    JSON.stringify({ status: "false", data: "todoList API發生錯誤" }, null, 2)
  );
  res.end();
}

module.exports = errorHandle;
