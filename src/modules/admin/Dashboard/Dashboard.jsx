import { useEffect, useState } from "react";

import Navbar from "../../../components/Navbar/Navbar";
import WelcomeBanner from "../../../components/Dashboard/WelcomeBanner/WelcomeBanner";
import StatCard from "../../../components/Dashboard/StatCard/StatCard";
import BookingChart from "../../../components/Dashboard/BookingChart/BookingChart";
import RecentActivities from "../../../components/Dashboard/RecentActivities/RecentActivities";
import RecentTrips from "../../../components/Dashboard/RecentTrips/RecentTrips";
import UpcomingTrips from "../../../components/Dashboard/UpcomingTrips/UpcomingTrips";

import { Plane, Calendar, IndianRupee, MapPinned } from "lucide-react";

import dashboardService from "../../../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadDashboardSummary();
  }, []);

  const loadDashboardSummary = async () => {
    try {
      const data = await dashboardService.getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error("Failed to load dashboard summary:", error);
    }
  };

  const stats = [
    {
      title: "Total Trips",
      value: summary?.totalTrips ?? 0,
      icon: <Plane size={30} />,
      color: "linear-gradient(135deg,#10B981,#22C55E)",
    },
    {
      title: "Ongoing Trips",
      value: summary?.ongoingTrips ?? 0,
      icon: <Calendar size={30} />,
      color: "linear-gradient(135deg,#2563EB,#3B82F6)",
    },
    {
      title: "Upcoming Trips",
      value: summary?.upcomingTrips ?? 0,
      icon: <MapPinned size={30} />,
      color: "linear-gradient(135deg,#8B5CF6,#A855F7)",
    },
    {
      title: "Total Expenses",
      value: `₹${Number(summary?.totalExpenses ?? 0).toLocaleString("en-IN")}`,
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
          <RecentTrips />
          <UpcomingTrips />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
