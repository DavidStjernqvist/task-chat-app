const express = require("express");
const app = express();
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socket(server);
app.use(cors());
// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const index = require("./src/index");
app.use(index);

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

io.on("connection", (socket) => {

    socket.on('join', ({name, room}, callback) => {
        console.log(`User joined room ${room}`);
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.join(user.room);
        
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});

        //Sends message to the chatroom, the user who joins cant see
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log(`SendMessage: Message: ${message}`);
        io.to(user.room).emit('message', {user: user.name, text: message});

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});


        callback();
    })

    socket.on('disconnect', () => {
        console.log("User left");
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
        }
    })
});

server.listen(port, () => console.log(`Listening on port: ${port}`));