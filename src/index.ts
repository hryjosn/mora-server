import { Server } from 'socket.io'
import express, { Request, Response } from "express"
import http from 'http'
import { ServerToClientEvents, ClientToServerEvents } from "./types"

const app = express()
const server = http.createServer(app);
const port = 80

const io = new Server<
ClientToServerEvents, 
ServerToClientEvents
>(server);
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
    console.log('connecting');
    socket.on("joinRoom", (res) => {
        const {roomID, userName} =res
        socket.join(roomID);
        io.to(roomID).emit('joinRoom', {userName})
    });
    socket.on("onReady", (res) => {
        const {roomID, userName} = res
        io.to(roomID).emit('onReady', {roomID, userName})
    });
    socket.on("start", (res) => {
        const {roomID} = res
        io.to(roomID).emit('start', {message: 'starting'})
    });
    socket.on("mora", (res) => {
        const {roomID, mora, userName} = res
        io.to(roomID).emit("mora", {roomID, mora, userName})
    });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});