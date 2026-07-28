import "./RecentTrips.css";

import { useState, useEffect } from "react";
import tripService from "../../../services/tripService";

const RecentTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await tripService.getTrips(0, 5); // Fetch latest 5 trips
        if (response && response.content) {
            setTrips(response.content);
        } else if (Array.isArray(response)) {
            setTrips(response);
        }
      } catch (error) {
        console.error("Failed to fetch recent trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="recent-trips">
      <div className="section-header">
        <div>
          <h2>Recent Trips</h2>
          <p>Your latest travel plans</p>
        </div>

        <button className="view-all-btn">
          View All
          <i className="bi bi-chevron-right" style={{ marginLeft: "6px" }}></i>
        </button>
      </div>

      <div className="trip-list">
        {loading ? (
          <p style={{ padding: '20px' }}>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p style={{ padding: '20px' }}>No recent trips found.</p>
        ) : trips.map((trip) => (
          <div className="recent-trip-card" key={trip.id}>
            <div className="trip-left">
              <div className="trip-icon">
                <i className="bi bi-geo-alt"></i>
              </div>

              <div className="trip-info">
                <h3>{trip.destination || trip.title}</h3>

                <div className="trip-meta">
                  <span>
                    <i className="bi bi-calendar3"></i>
                    {trip.startDate} - {trip.endDate}
                  </span>

                  <span>
                    <i className="bi bi-wallet2"></i>
                    ₹{trip.budget}
                  </span>
                </div>
              </div>
            </div>

            <div className="trip-right">
              <span className={`status ${(trip.tripStatus || 'PLANNED').toLowerCase()}`}>
                {trip.tripStatus || 'PLANNED'}
              </span>

              <button>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrips;
