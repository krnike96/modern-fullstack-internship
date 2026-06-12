const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const PORT = 8000;
const app = express();
const path = require("path");
// app is resolver function 
const server = http.createServer(app);

// creating the socket server 
const io = new Server(server);

// this is a middleware to send your public files to the browser
app.use(express.static(path.join(__dirname, "public")));


// io - instance of the Socket Server (all active connections)
io.on("connection", (socket) => {
    console.log("Connection established with socket id: ", socket.id);

    // socket represent one active connection (or one active user)
    socket.on("user-message", (message) => {
        console.log("Received:", message);
        
        // send this received message or pass this to all connected users
        io.emit("user-message", message); // io represents all connected users on socket server
    });

    // close the connection
    socket.on("disconnect", () => {
        console.log("Connection is closed");
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
//