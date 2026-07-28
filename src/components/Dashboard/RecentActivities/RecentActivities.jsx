import { useEffect, useState } from "react";
import tripService from "../../../services/tripService";
import "./RecentActivities.css";

const getRelativeTime = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  let interval = seconds / 31536000;
  if (interval >= 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval >= 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval >= 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval >= 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  return Math.floor(interval) + " mins ago";
};

const formatTypeStr = (str) => {
  if (!str) return "Tour";
  return str.split(' + ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' + ');
};

function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const tripList = await tripService.getTrips(0, 10);
        const sorted = (tripList.content || []).sort((a, b) => b.tripId - a.tripId);
        const mapped = sorted.slice(0, 5).map(trip => ({
          id: trip.tripId,
          text: `${trip.travelerName || trip.userName || "User"} created a new ${formatTypeStr(trip.tripType)} booking to ${trip.destination || "Not Specified"}.`,
          time: getRelativeTime(trip.createdAt)
        }));
        setActivities(mapped);
      } catch (err) {
        console.error("Failed to fetch recent activities:", err);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="recent-activities glass">
      <h3>Recent Activities</h3>
      {activities.length > 0 ? (
        <ul>
          {activities.map(act => (
            <li key={act.id}>
              <div>{act.text}</div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>{act.time}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#9CA3AF', padding: '16px' }}>No recent activities found.</p>
      )}
    </div>
  );
}

export default RecentActivities;
