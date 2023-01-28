const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));

const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("message", (message, userName) => {
    io.emit("createMessage", message, userName);
  });
});

server.listen(3030);