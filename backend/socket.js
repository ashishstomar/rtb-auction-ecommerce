const http = require("http");
const socketIO = require("socket.io");
const app = require("./index");
const server = http.createServer(app);
const io = socketIO(server);

server.listen(5000, () => console.log("Server running on port 5000"));
