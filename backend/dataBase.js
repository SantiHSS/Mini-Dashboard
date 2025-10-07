const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) return console.error("Error abriendo DB:", err.message);

  console.log("Base de datos SQLite conectada.");

  // Crear tabla si no existe
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `, (err) => {
    if (err) console.error("Error creando tabla:", err.message);
  });
});

module.exports = db;
