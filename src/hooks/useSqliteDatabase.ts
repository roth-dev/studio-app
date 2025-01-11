import SQLiteDB, { DatabaseTable } from "@/database/Sqlit";

export default function useSqliteDatabase() {
  const sqliteDb = new SQLiteDB();
  /**
   *
   * @param table which is DatabaseTable type
   */
  async function createTable(table: DatabaseTable) {
    const db = await sqliteDb.openDatabase(table.tableName);
    const result = await sqliteDb.createTable(db, table);
  }

  async function initailizeDatabase(dbName: string) {
    try {
      const result = await sqliteDb.createDatabase(dbName);
      console.log("Database created successfully!");
    } catch (err) {
      console.log(err);
    }
  }
  return { createTable, initailizeDatabase };
}
