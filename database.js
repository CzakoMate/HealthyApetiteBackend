import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
  await dbRun(
    "CREATE TABLE IF NOT EXISTS promotions (id INTEGER PRIMARY KEY AUTOINCREMENT, startDate DATE NOT NULL, endDate DATE NOT NULL, discountRate REAL NOT NULL)"
  );
};

const dbQuerry = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export { db, dbQuerry, dbRun, initializeDB };
