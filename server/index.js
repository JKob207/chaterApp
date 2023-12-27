const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const userModel = require('./models/user');
const conversationModel = require('./models/conversation');
const messageModel = require('./models/message');

const routes = require('./routes');

const app = express();

const PORT = 3001;

const dotenv = require('dotenv').config();
app.use(cors());

const connectDB = require('./config/database');

require('./config/passport')(passport);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes);

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

// Socket.io

const io = socket(server, 
    {
        cors: {
            origin: "http://127.0.0.1:5173",
            methods: ["GET", "POST"]
        }
    }
);

let usersIoID = [];

const addSocketUser = (userId, socketId) => {
    !usersIoID.some(user => user.userId === userId) &&
        usersIoID.push({userId, socketId});
};

const removeSocketUser = (socketId) => {
    usersIoID = usersIoID.filter(user => user.socketId !== socketId);
}

const getSocketUser = (userId) => {
    return usersIoID.find(user=>user.userId === userId);
}

io.on("connection", (socket) => {
    //When connect
    console.log("User connected!");
    socket.on("addUser", (userId) => {
        addSocketUser(userId, socket.id);
        io.emit("getUsers", usersIoID);
    });

    //When send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getSocketUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        });
    })

    //when disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected!");
        removeSocketUser(socket.id);
        io.emit("getUsers", usersIoID);
    });
});