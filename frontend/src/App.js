import React, { useState, useEffect } from "react";
import DashboardCards from "./components/DashboardCards";
import SearchBar from "./components/SearchBar";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

useEffect(() => {
  fetch("http://localhost:5000/api/users")
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.error(err));
}, []);

const handleAddUser = async (user) => {
  const res = await fetch("http://localhost:5000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  const newUser = await res.json();
  setUsers([...users, newUser]);
};

const handleUpdateUser = async (user) => {
  const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  const updatedUser = await res.json();
  setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  setEditingUser(null);
};

const handleDeleteUser = async (id) => {
  await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
  setUsers(users.filter(u => u.id !== id));
};


  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="App">
      <header>
        <h1>📝 Mini Admin Dashboard</h1>
        <DashboardCards totalUsers={users.length} />
      </header>
      <SearchBar search={search} setSearch={setSearch} />
      <UserForm
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <UserTable
        users={filteredUsers}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
}

export default App;
