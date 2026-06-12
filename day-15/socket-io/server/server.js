const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

// PORT
const PORT = 9999;

// express instance
const app = express();
app.use(express.static(path.join(__dirname, "public")));

// create http server
const server = http.createServer(app);

// pass http server to socket server instance
const io = new Server(server);

// listen for the new connection
// socket obj: represents one connection
io.on("connect", (socket) => {
    console.log("Connectio established with socket id: ", socket.id);
    socket.on("user-message", (message) => {
        console.log("Received: ", message);

        io.emit("user-message", message);
    })

    socket.on("disconnet", () => {
        console.log("connection closed for ID:", socket.id);
    })
})

server.listen(PORT, () => {
    console.log(`Socket server is listening to port: ${PORT}`);
})


