import { useState, useEffect } from "react";

function UserForm({ onAddUser, onUpdateUser, editingUser, setEditingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      onUpdateUser({ ...editingUser, name, email });
    } else {
      onAddUser({ name, email });
    }
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{editingUser ? "Actualizar" : "Agregar"}</button>
      {editingUser && (
        <button type="button" onClick={() => setEditingUser(null)}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default UserForm;
