import db from "../db";
import Library from "./Library";

class Seat {
  static fetchAll() {
    return await db.select().from('seats');
  }
}
export default Seat;
