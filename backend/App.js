const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socket(server);
//app.use(cors);
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const index = require("./src/index");
app.use(index);



io.on("connection", async (socket) => {
    userJoinedMessage(socket);
    socketId(socket);
    sendMessage(socket);
});
const userJoinedMessage = (socket) => {
    socket.broadcast.emit('User joined the room');
}
const socketId = (socket) => {
    socket.emit('socketId', socket.id);
}
const sendMessage = (socket) => {
    socket.on("sendMessage", body => {
        io.emit("message", body)
    });
}

server.listen(port, () => console.log(`Listening on port: ${port}`));