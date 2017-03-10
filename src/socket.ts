import * as socketIO from "socket.io";
import Sensor from "./models/Sensor";

function io(server: any): void {
  let socket = socketIO(server);

  socket.on("connection", async (socket: any) => {
    let res = await Sensor.getLatestSensorReading(1);

    socket.emit('UPDATE_FRONTEND', {
      lights: Math.random() > 0.5 ? "ON" : "OFF",
      temperature: getRandomInt(20, 23).toString(),
      roomTemperature: res.temperature,
    });

    setInterval(async () => {
      res =  await Sensor.getLatestSensorReading(1)
      socket.emit('UPDATE_FRONTEND', {
        lights: Math.random() > 0.5 ? "ON" : "OFF",
        temperature: getRandomInt(20, 23).toString(),
        roomTemperature: res.temperature,
      });
    }, 5000);
  });
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default io;
