function DashboardCards({ totalUsers }) {
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Total Usuarios</h2>
        <p>{totalUsers}</p>
      </div>
    </div>
  );
}

export default DashboardCards;
