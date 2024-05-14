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
    console.log('connecting');
    socket.on("joinRoom", (res) => {
        const {roomID, userName} =res
        socket.join(roomID, {userName});
    });
    socket.on("onReady", (res) => {
        const {roomID, userName} = res
        io.to(roomID).emit('onReady', {roomID, userName})
    });
    socket.on("start", (res) => {
        const {roomID} = res
        io.to(roomID).emit('starting')
    });
    socket.on("mora", (res) => {
        const {roomID, mora, userName} = res
        io.to(roomID).emit("mora", {roomID, mora, userName})
    });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});