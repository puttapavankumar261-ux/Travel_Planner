import "./UpcomingTrips.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UpcomingTrips = ({ trips = [] }) => {
  const navigate = useNavigate();

  // Only upcoming/planned trips
  const upcomingTrips = trips.filter(
    (trip) =>
      trip.tripStatus === "PLANNED" ||
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
          <p style={{ color: "#bbb", textAlign: "center", padding: "20px" }}>
            No Upcoming Trips
          </p>
        ) : (
          upcomingTrips.map((trip) => (
            <div className="upcoming-card" key={trip.tripId}>
              <div className="upcoming-left">
                <div className="upcoming-icon">
                  <FaMapMarkerAlt />
                </div>

                <div className="upcoming-info">
                  <h3>{trip.destination}</h3>

                  <div className="upcoming-meta">
                    <span>
                      <FaCalendarAlt />
                      {trip.startDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="upcoming-right">
                <span className="days-left">
                  {calculateDaysLeft(trip.startDate)}
                </span>

                <button
                  onClick={() =>
                    navigate(`/user/trips/${trip.tripId}`)
                  }
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

export default UpcomingTrips;
