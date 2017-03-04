import db from "../db";

class Model {
  protected static tableName: string;

  static async fetch(id: number): Promise<any> {
    let res = await db.select().from(this.tableName).where('id', id);

    return res[0];
  }

  static async fetchAll() {
    return await db.select().from(this.tableName);
  }
}

export default Model;
