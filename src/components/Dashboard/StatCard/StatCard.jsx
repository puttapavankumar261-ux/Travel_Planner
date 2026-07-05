import "./StatCard.css";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card glass">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>

      <div className="stat-content">
        <h5>{title}</h5>
        <h2>{value}</h2>

        <p>↑ 12.5% from last month</p>
      </div>
    </div>
  );
}

export default StatCard;
