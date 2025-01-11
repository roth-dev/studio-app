import * as Fs from "expo-file-system";
function getDatabasePath(dbName: string) {
  return `${Fs.documentDirectory}Sqlite/${dbName}`;
}

export { getDatabasePath };
