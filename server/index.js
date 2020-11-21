const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const cors = require('cors');

const {addUser, removeUser, getUser, getUsersInRoom} = require("./users");

const PORT = process.env.PORT || 5000;
const router = require('./router');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
const server = http.createServer(app);
const options = {
    cors:true,
 origins:["*"],
};

const io = socketio(server, options);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    socket.on('join', ({name, room, actuName, actuRoom}, callback)=>{
        console.log("user has connected!");
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) return callback(error)

        socket.join(user.room);

        socket.emit('message', {user: 'admin', text: `${actuName} is welcome to the room ${actuRoom}`})
        socket.broadcast.to(user.room).emit('message', {user: "admin", text: `${actuName} has joined our room`})

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    });

    socket.on('sendMessage', (message, name, room, callback) => {
        const user = getUser(socket.id);
        room = room.toLowerCase().trim();
        name = name.toLowerCase().trim();

        if(!user){
            console.log("!user, thus room value assigned again!");
            console.log(socket.id);
            const user = removeUser(socket.id);
            console.log(room, name);
            user.room = room.toLowerCase().trim();
            user.name = name.toLowerCase().trim();
        }
        
            console.log("correctly from sendMEssage: "+name);
            //io.to(room).emit('message', {user: name, text: message});
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
        
    })

    socket.on('disconnection', () => {
        console.log("User has left. Disconnected");
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${((user.name.split('--')[0]).charAt(0).toUpperCase() + (user.name.split('--')[0]).slice(1))} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
          }
    })
})

server.listen(process.env.PORT || 5000, () => console.log("Server has started."));