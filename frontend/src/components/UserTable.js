function UserTable({ users, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => onEdit(user)}>✏️ Editar</button>
              <button onClick={() => onDelete(user.id)}>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
