let socket: WebSocket | null = null;

export const connectWebsocket = (url: string): WebSocket => {
    socket = new WebSocket(url)
    return socket;
};

export const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN){
        socket.send(message);

    } else {
        console.warn("WebScoket is not open");
        
    }
};

export const closeWebsocket = () => {
    if (socket) socket.close();
}; 