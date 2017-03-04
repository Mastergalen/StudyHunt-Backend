import db from "../db";
import Seat from "./Seat";
import Model from "./Model";

class Library extends Model {
  protected static tableName = 'libraries';

  static async getSeats(libraryId: number) {
    return await db.select(
      'id',
      'is_vacant',
      'created_at',
      'updated_at'
    ).from('seats').where('library_id', libraryId);
  }

  static async countAllSeats(libraryId: number): Promise<number> {
    let res = await db('seats').where('library_id', libraryId).count('*');

    return res[0]["count(*)"];
  }

  static async countVacantSeats(libraryId: number): Promise<number> {
    let res = await db('seats').where({
      'library_id': libraryId,
      'is_vacant': true
    }).count('*');

    return res[0]["count(*)"];
  }

  static async search(query: string): Promise<any> {
    return await db(this.tableName).where(
      db.raw(`LOWER(name) LIKE '%${query.toLowerCase()}%'`)
    );
  }
}

export default Library;
