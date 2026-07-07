import "./StatCard.css";

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>

      <div className="stat-content">
        <h2>{value}</h2>

        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
