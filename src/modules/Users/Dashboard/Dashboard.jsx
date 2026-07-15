import "./Dashboard.css";
import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import WelcomeBanner from "../../../components/UserDashboard/WelcomeBanner/WelcomeBanner";
import StatCard from "../../../components/UserDashboard/StatCard/StatCard";
import RecentTrips from "../../../components/UserDashboard/RecentTrips/RecentTrips";
import UpcomingTrips from "../../../components/UserDashboard/UpcomingTrips/UpcomingTrips";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import {
  FaPlaneDeparture,
  FaCalendarAlt,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <BackgroundSlider />
      <div className="dashboard-container">
        <UserNavbar />
        <WelcomeBanner userName="Pavan" />

        <div className="stats-container">
          <StatCard
            icon={<FaPlaneDeparture />}
            title="Total Trips"
            value="18"
            color="#2563eb"
          />

          <StatCard
            icon={<FaCalendarAlt />}
            title="Upcoming Trips"
            value="5"
            color="#2563eb"
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Completed Trips"
            value="13"
            color="#2563eb"
          />

          <StatCard
            icon={<FaWallet />}
            title="Travel Budget"
            value="₹85K"
            color="#2563eb"
          />
        </div>

        <div className="dashboard-grid">
          <RecentTrips />
          <UpcomingTrips />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
