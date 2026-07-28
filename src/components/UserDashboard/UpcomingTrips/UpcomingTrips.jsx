import "./UpcomingTrips.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import tripService from "../../../services/tripService";

const calculateDaysLeft = (startDate) => {
  const diffTime = Math.abs(new Date(startDate) - new Date());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + " Days Left";
};

const UpcomingTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripService.getTrips(0, 5); // Fetch latest 5 trips
        if (response && response.content) {
            setTrips(response.content.filter(t => new Date(t.startDate) > new Date()));
        } else if (Array.isArray(response)) {
            setTrips(response.filter(t => new Date(t.startDate) > new Date()));
        }
      } catch (error) {
        console.error("Failed to fetch upcoming trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="upcoming-trips">
      <div className="section-header">
        <div>
          <h2>Upcoming Trips</h2>
          <p>Your next adventures</p>
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/user/trips")}
        >
          View All
          <FaChevronRight />
        </button>
      </div>

      <div className="upcoming-list">
        {loading ? (
          <p style={{ padding: '20px' }}>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p style={{ padding: '20px' }}>No upcoming trips found.</p>
        ) : trips.map((trip) => (
          <div className="upcoming-card" key={trip.id}>
            <div className="upcoming-left">
              <div className="upcoming-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="upcoming-info">
                <h3>{trip.destination || trip.title}</h3>

                <div className="upcoming-meta">
                  <span>
                    <FaCalendarAlt />
                    {trip.startDate}
                  </span>
                </div>
              </div>

            <div className="upcoming-right">
              <span className="days-left">{calculateDaysLeft(trip.startDate)}</span>

                <button
                  onClick={() =>
                    navigate(`/user/trips/${trip.tripId}`)
                  }
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
      

export default UpcomingTrips;
