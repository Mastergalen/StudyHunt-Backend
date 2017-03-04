import db from "../db";
import Library from "./Library";
import Model from "./Model";
import * as knex from "knex";

class Seat extends Model {
  protected static tableName = 'seats';

  static async update(seatId: number, isVacant: boolean) {
    return await db.transaction((trx: knex.Transaction) => {
      return db(this.tableName).transacting(trx).where('id', seatId).update({
        is_vacant: isVacant,
        updated_at: db.fn.now()
      }).then(() => {
        return db('seats_log').transacting(trx).insert({
          seat_id: seatId,
          is_vacant: isVacant,
          created_at: db.fn.now()
        });
      });
    })
  }
}
export default Seat;
