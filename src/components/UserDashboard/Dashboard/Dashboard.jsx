import "./Dashboard.css";

import WelcomeBanner from "../../../components/UserDashboard/WelcomeBanner/WelcomeBanner";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <WelcomeBanner userName="Pavan" />
      </div>
    </div>
  );
};

export default Dashboard;
