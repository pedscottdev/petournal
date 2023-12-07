import React from "react";
import socketio from "socket.io-client";
import { store } from "../store";

const socket = () => {
    const token = store.getState().user.accessToken;
    if (token) {
        return socketio(process.env.HOST, {
            extraHeaders: { Authorization: token },
        });
    }
    return socketio(process.env.HOST);
};
export default socket;

export const SocketContext = React.createContext();
