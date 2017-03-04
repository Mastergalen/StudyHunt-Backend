import db from "../db";
import Library from "./Library";
import Model from "./Model";

class Sensor extends Model {
  protected static tableName = 'sensors';

  static async getSeats(sensorId: number) {
    return await db('sensors_seats').where('sensor_id', sensorId);
  }
}

export default Sensor;
