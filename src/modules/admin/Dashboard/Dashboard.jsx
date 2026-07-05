import Navbar from "../../../components/Navbar/Navbar";
import WelcomeBanner from "../../../components/Dashboard/WelcomeBanner/WelcomeBanner";
import StatCard from "../../../components/Dashboard/StatCard/StatCard";
import BookingChart from "../../../components/Dashboard/BookingChart/BookingChart";
import RecentActivities from "../../../components/Dashboard/RecentActivities/RecentActivities";
import RecentUsers from "../../../components/Dashboard/RecentUsers/RecentUsers";
import UpcomingTrips from "../../../components/Dashboard/UpcomingTrips/UpcomingTrips";
import { Users, Plane, Calendar, IndianRupee } from "lucide-react";

import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1250",
      icon: <Users size={30} />,
      color: "linear-gradient(135deg,#2563EB,#3B82F6)",
    },
    {
      title: "Total Trips",
      value: "325",
      icon: <Plane size={30} />,
      color: "linear-gradient(135deg,#10B981,#22C55E)",
    },
    {
      title: "Bookings",
      value: "95",
      icon: <Calendar size={30} />,
      color: "linear-gradient(135deg,#8B5CF6,#A855F7)",
    },
    {
      title: "Revenue",
      value: "₹8,45,000",
      icon: <IndianRupee size={30} />,
      color: "linear-gradient(135deg,#F59E0B,#FB923C)",
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-wrapper">
        <WelcomeBanner />

        <div className="stats-grid">
          {stats.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <div className="dashboard-grid">
          <BookingChart />

          <RecentActivities />
        </div>
        <div className="dashboard-grid">
          <RecentUsers />

          <UpcomingTrips />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
