const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const path = require("path");

const PORT = 9898;
const app = express();

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, public)));

const io = new Server(server);

const users = [];

io.on("connection", (socket) => {

    socket.on("register-user", (username) => {
        users[username] = socket.id;
        console.log(`User ${username} registered`);
    })

    socket.on("private-msg", (data) => {
        const re
    })

    socket.on()
});

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})