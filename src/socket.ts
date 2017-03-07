import * as socketIO from "socket.io";

function io(server: any): void {
  let socket = socketIO(server);

  socket.on("connection", (socket: any) => {
    setInterval(() => {
      socket.emit('UPDATE_FRONTEND', {
        lights: Math.random() > 0.5 ? "ON" : "OFF",
        temperature: getRandomInt(20, 23).toString()
      });
    }, 5000);
  });
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default io;
