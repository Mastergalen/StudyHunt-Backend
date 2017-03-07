import db from "../db";
import Library from "./Library";
import Model from "./Model";

class Sensor extends Model {
  protected static tableName = 'sensors';

  static async getSeats(sensorId: number) {
    return await db('sensors_seats').where('sensor_id', sensorId);
  }

  static async logSensor(sensorId: number, temperature: number, luminosity: number) {
    return await db('sensors_log').insert({
      sensor_id: sensorId,
      temperature,
      luminosity
    });
  }
}

export default Sensor;
