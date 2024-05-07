import { Server } from "socket.io";
import express from 'express';

const app = express()
const port = 3000

const io = new Server({ /* options */ });
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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

io.listen(3000);