import * as socketIO from "socket.io";
import Sensor from "./models/Sensor";
import Library from "./models/Library";

function io(server: any): void {
  let socket = socketIO(server);

  socket.on("connection", async (socket: any) => {
    let searchResults = await Library.search("Engineering Hub");
    let engineeringHubId = searchResults[0].id;

    let sendUpdate = async () => {
      let sensorReading = await Sensor.getLatestSensorReading(1);
      let seats = await Library.getSeats(engineeringHubId);
      let usedSeats = 0;

      for (let s of seats) {
        if (!s.is_vacant) usedSeats++;
      }

      let isLightOn: boolean = usedSeats > 0;

      socket.emit('UPDATE_FRONTEND', {
        lights: isLightOn ? "ON" : "OFF",
        temperature: getRandomInt(20, 23).toString(),
        roomTemperature: sensorReading.temperature,
      });
    }

    await sendUpdate();
    setInterval(sendUpdate, 5000);
  });
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default io;
