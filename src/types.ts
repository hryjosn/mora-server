export interface ServerToClientEvents {
    joinRoom: (messageData:{
        roomID: string
    }) => void;
    onReady: (messageData:{
        userName: string,
        roomID: string,
    }) => void;
    start: (messageData:{
        message: string,
    }) => void;
    mora: (messageData:{
        userName: string,
        roomID: string,
        mora: string
    }) => void;
    userJoin: (messageData:{
        userName: string,
        roomID: string,
    }) => void;
  }

export interface ClientToServerEvents {
    join: (roomId:string) => void;
    joinRoom: (messageData:{
        roomID: string,
    }) => void;
    onReady: (messageData:{
        userName: string,
        roomID: string,
    }) => void;
    start: (messageData:{
        userName: string,
        roomID: string,
    }) => void;
    mora: (messageData:{
        userName: string,
        roomID: string,
        mora: string
    }) => void;
    userJoin: (messageData:{
        userName: string,
        roomID: string,
    }) => void;
  }
