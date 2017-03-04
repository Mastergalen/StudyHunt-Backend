import db from "../db";
import Library from "./Library";
import Model from "./Model";

class Seat extends Model {
  protected static tableName = 'seats';

  static async update(seatId: number, isVacant: boolean) {
    return db(this.tableName).where('id', seatId).update({
      is_vacant: isVacant,
      updated_at: db.fn.now()
    });
  }
}
export default Seat;
