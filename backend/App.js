const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketIo(server);

const index = require("./src/index");
app.use(index);

const fireBaseAdmin = require("./config/firebase");
let defaultAuth = fireBaseAdmin.auth();
let defaultDatabase = fireBaseAdmin.database();

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if(interval)
        clearInterval(interval);
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = (socket) => {
    // const response = new Date();
    const response = {name: "David Stjernqvist"};
    socket.emit("FromAPI", response);
};

defaultAuth.listUsers().then((userRecords) => {
    userRecords.users.forEach((user) => console.log(user.providerData));
})
// const getAllUsers = (req, res) => {
//    // const maxResults = 1; // optional arg.
  
//     defaultAuth.listUsers().then((userRecords) => {
//       userRecords.users.forEach((user) => console.log(user.toJSON()));
//       res.end('Retrieved users list successfully.');
//     }).catch((error) => console.log(error));
//   };
//   getAllUsers();
server.listen(port, () => console.log(`Listening on port: ${port}`));