// server configuration file
const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);
const PORT = 5000;

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));


const users = [];
io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    // handle events -- register-user, private-msg
    socket.on("register-user", (username) => {
        users[username] = socket.id;
        console.log("users: ", users);
    });

    // handling private-message event
       socket.on("private-message", (data) => {

        const receiverSocketId = users[data.to];

        if (receiverSocketId) {

            io.to(receiverSocketId).emit("message", {
                from: data.from,
                to: data.to,
                text: data.text
            });

        } else {

            socket.emit("message", {
                from: "Server",
                to: data.from,
                text: `${data.to} is not online`
            });
        }
    });

    socket.on("disconnect", () => {
        for(const username in users){
            if(users[username] === socket.id){
                delete users[username];
                break;
            }
        }
        console.log("User Socket Id disconnected!");
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})