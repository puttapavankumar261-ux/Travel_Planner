import "./UpcomingTrips.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpcomingTrips = ({ trips = [], onViewTrip }) => {
  const navigate = useNavigate();

  const upcomingTrips = trips.filter(
    (trip) =>
      trip.tripStatus === "PLANNED" ||
      trip.tripStatus === "CONFIRMED" ||
      trip.tripStatus === "UPCOMING" ||
      trip.tripStatus === "ONGOING"
  );

  const calculateDaysLeft = (startDate) => {
    const today = new Date();
    const tripDate = new Date(startDate);

    const diff = Math.ceil(
      (tripDate - today) / (1000 * 60 * 60 * 24)
    );

    if (diff <= 0) return "Started";

    return `${diff} Days Left`;
  };
const handleCancel = (tripId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this trip?"
  );

  if (!confirmCancel) return;

  console.log("Cancel Trip:", tripId);

  // Later you'll call your backend API here.
};
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
        {upcomingTrips.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "#cbd5e1" }}>
            No upcoming trips found.
          </p>
        ) : (
          upcomingTrips.map((trip) => (
            <div className="upcoming-card" key={trip.tripId}>
              {/* Left Group */}
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
              </div>

              {/* Right Group (Placed as a sibling to upcoming-left) */}
              <div className="upcoming-right">
  <span className="days-left">
    {calculateDaysLeft(trip.startDate)}
  </span>

  <div className="trip-actions">
    <button
      className="view-btn"
      onClick={() => onViewTrip && onViewTrip(trip)}
    >
      View
    </button>

    {calculateDaysLeft(trip.startDate) !== "Started" && (
      <button
        className="cancel-btn"
        onClick={() => handleCancel(trip.tripId)}
      >
        Cancel
      </button>
    )}
  </div>
</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default UpcomingTrips;
