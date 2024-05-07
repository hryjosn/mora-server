const { Server } = require("socket.io");
const express = require('express');
const http = require('http');

const app = express()
const server = http.createServer(app);
const port = 80

const io = new Server(server);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
    socket.on("createRoom", (res) => {
        socket.join(res);
    });
    socket.on("joinRoom", (res) => {
        socket.join(res);
    });
    socket.on("onReady", (res) => {
        const {roomID} = res
        io.to(roomID).emit('onReady')
    });
    socket.on("start", (res) => {
        const {roomID} = res
        io.to(roomID).emit('starting')
    });
    socket.on("mora", (res) => {
        const {roomID, mora, userId} = res
        io.to(roomID).emit({roomID, mora, userId})
    });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});