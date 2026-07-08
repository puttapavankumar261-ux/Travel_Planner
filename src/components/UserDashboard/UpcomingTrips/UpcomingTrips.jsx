import "./UpcomingTrips.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

const upcomingTrips = [
  {
    id: 1,
    destination: "Ooty",
    departure: "15 Aug 2026",
    daysLeft: "18 Days Left",
  },
  {
    id: 2,
    destination: "Delhi",
    departure: "28 Aug 2026",
    daysLeft: "31 Days Left",
  },
  {
    id: 3,
    destination: "Jaipur",
    departure: "10 Sep 2026",
    daysLeft: "44 Days Left",
  },
];

const UpcomingTrips = () => {
  return (
    <div className="upcoming-trips">
      <div className="section-header">
        <div>
          <h2>Upcoming Trips</h2>
          <p>Your next adventures</p>
        </div>

        <button className="view-all-btn">
          View All
          <FaChevronRight />
        </button>
      </div>

      <div className="upcoming-list">
        {upcomingTrips.map((trip) => (
          <div className="upcoming-card" key={trip.id}>
            <div className="upcoming-left">
              <div className="upcoming-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="upcoming-info">
                <h3>{trip.destination}</h3>

                <div className="upcoming-meta">
                  <span>
                    <FaCalendarAlt />
                    {trip.departure}
                  </span>
                </div>
              </div>
            </div>

            <div className="upcoming-right">
              <span className="days-left">{trip.daysLeft}</span>

              <button className="view-trip-btn">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTrips;
