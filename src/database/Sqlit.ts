import * as SQLite from "expo-sqlite";
import * as Fs from "expo-file-system";
import { Alert } from "react-native";
import { getDatabasePath } from "@/utils";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface User {
  name: string;
  age: number;
  address: string;
  gener?: Gender;
}

// Define all possible SQLite column types
export type ColumnTypeDefinition =
  | "TEXT" // String/Text
  | "INTEGER" // Whole numbers
  | "REAL" // Decimal numbers
  | "BLOB" // Binary large objects
  | "NUMERIC" // Numbers with flexibility for type determination
  | "BOOLEAN"; // True/False (maps to INTEGER in SQLite)

// Column definition with type and name
export type ColumnDefinition = {
  name: string;
  type: ColumnTypeDefinition;
  primaryKey?: boolean;
  notNull?: boolean;
  unique?: boolean;
  defaultValue?: any;
};

export interface DatabaseTable {
  tableName: string;
  columns: ColumnDefinition[];
}

export default class SQLiteDB {
  // Utility to open or create a database
  public openDatabase = (dbName: string): Promise<SQLite.SQLiteDatabase> => {
    return SQLite.openDatabaseAsync(dbName);
  };

  public async createDatabase(dbName: string, table?: DatabaseTable) {
    const dbFilePath = getDatabasePath(dbName);

    const fileInfo = await Fs.getInfoAsync(dbFilePath);
    if (fileInfo.exists) {
      Alert.alert(`Database name ${dbName} already exist`);
    } else {
      const db = await this.openDatabase(dbFilePath);
      // const raw = `INSET INTO users (name, age, gender, address, )`;
      console.log(db);
      if (table) {
        await this.createTable(db, table);
      }
    }
  }

  public async createTable(db: SQLite.SQLiteDatabase, table: DatabaseTable) {
    try {
      const schema = `CREATE TABLE IF NOT EXISTS ${
        table.tableName
      } (${this.generateColumns(table.columns)});`;
      const result = await db.execAsync(schema);

      return result;
    } catch {
      throw new Error(`Error can not create table: ${table.tableName}`);
    }
  }

  private generateColumns(columns: DatabaseTable["columns"]) {
    const columnsSQL = columns
      .map((col) => {
        const constraints = [
          col.primaryKey ? "PRIMARY KEY" : "",
          col.notNull ? "NOT NULL" : "",
          col.unique ? "UNIQUE" : "",
          col.defaultValue !== undefined ? `DEFAULT ${col.defaultValue}` : "",
        ]
          .filter(Boolean)
          .join(" ");

        return `${col.name} ${col.type} ${constraints}`.trim();
      })
      .join(", ");

    return columnsSQL;
  }
}
