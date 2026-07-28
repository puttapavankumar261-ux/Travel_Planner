import "./Dashboard.css";
import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import WelcomeBanner from "../../../components/UserDashboard/WelcomeBanner/WelcomeBanner";
import { useState, useEffect } from "react";
import tripService from "../../../services/tripService";
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
  const user = JSON.parse(localStorage.getItem("user"));
  const [trips, setTrips] = useState([]);

useEffect(() => {
  console.log(trips);
  const fetchTrips = async () => {
    try {
      const tripData = await tripService.getTripsByUser(user.userId);
      setTrips(tripData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  if (user?.userId) {
    fetchTrips();
  }
}, [user]);

  return (
    <div className="dashboard-page">
      <BackgroundSlider />

      <div className="dashboard-container">
        <UserNavbar />

        <WelcomeBanner
          userName={user?.firstName || "Guest"}
        />

        <div className="stats-container">
          <StatCard
            icon={<FaPlaneDeparture />}
            title="Total Trips"
            value={trips.length}
            color="#2563eb"
          />

          <StatCard
            icon={<FaCalendarAlt />}
            title="Upcoming Trips"
            value={
                trips.filter(
                 trip =>
                 trip.tripStatus === "PLANNED" ||
                 trip.tripStatus === "ONGOING"
                  ).length
                }
            color="#2563eb"
          />

          <StatCard
            icon={<FaCheckCircle />}
            title="Completed Trips"
            value={
             trips.filter(
             trip => trip.tripStatus === "COMPLETED"
              ).length
              }
            color="#2563eb"
          />

          <StatCard
            icon={<FaWallet />}
            title="Travel Budget"
            value={`₹${trips
            .reduce((sum, trip) => sum + (trip.budget || 0), 0)
            .toLocaleString()}`}
            color="#2563eb"
          />
        </div>

        <div className="dashboard-grid">
          <RecentTrips
           trips={trips.filter(
           (trip) => trip.tripStatus === "COMPLETED"
            )}
            />
          <UpcomingTrips trips={trips} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
