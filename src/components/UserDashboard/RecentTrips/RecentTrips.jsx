import "./RecentTrips.css";
import { useNavigate } from "react-router-dom";

const RecentTrips = ({ trips = [], onViewTrip }) => {
  const navigate = useNavigate();
console.log("Trips:", trips);
  // Show only completed trips

const today = new Date();
today.setHours(0, 0, 0, 0);

const recentTrips = trips.filter((trip) => {
  const endDate = new Date(trip.endDate);
  endDate.setHours(0, 0, 0, 0);
  return endDate <= today;
});
const displayStatus = "COMPLETED";
  return (
    <div className="recent-trips">
      <div className="section-header">
        <div>
          <h2>Recent Trips</h2>
          <p>Your latest completed trips</p>
        </div>

        
      </div>

      <div className="trip-list">
        {recentTrips.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            No completed trips found.
          </p>
        ) : (
          recentTrips.map((trip) => (
            <div className="recent-trip-card" key={trip.tripId}>
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
                      ₹{trip.budget?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="trip-right">
                <span className={`status ${displayStatus.toLowerCase()}`}>
                   {displayStatus}
                </span>

                <button
  onClick={() => onViewTrip && onViewTrip(trip)}
>
  View
</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTrips;
