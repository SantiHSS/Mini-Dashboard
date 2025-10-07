const express = require("express");
const cors = require("cors");
const db = require("./dataBase"); // Conexión SQLite

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ✅ Ruta base
app.get("/", (req, res) => res.send("API funcionando"));

// 🔹 Obtener todos los usuarios
app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 🔹 Crear usuario
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Faltan campos" });
  db.run(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email });
    }
  );
});

// 🔹 Actualizar usuario
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json({ id, name, email });
    }
  );
});

// 🔹 Eliminar usuario
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado", id });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
