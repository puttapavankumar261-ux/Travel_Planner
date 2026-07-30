import "./UpcomingTrips.css";
import { useNavigate } from "react-router-dom";

// const trips = [
//   {
//     id: 1,
//     place: "Goa",
//     date: "12 Jul",
//   },
//   {
//     id: 2,
//     place: "Kerala",
//     date: "18 Jul",
//   },
//   {
//     id: 3,
//     place: "Ooty",
//     date: "24 Jul",
//   },
//   {
//     id: 4,
//     place: "Manali",
//     date: "29 Jul",
//   },
// ];

const UpcomingTrips = ({ trips = [], onViewTrip }) => {
  const navigate = useNavigate();

  const uTrips = trips.filter(
    (trip) =>
      trip.tripStatus === "UPCOMING"
  );
  const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
  });

  return (
    <div className="upcoming-trips">
      <div className="section-header">
        <div>
          <h2>Upcoming Trips</h2>
          <p>Your upcoming travel plans</p>
        </div>

        <button className="view-all-btn">
          View All
          <i className="bi bi-chevron-right" style={{ marginLeft: "6px" }}></i>
        </button>
      </div>

      <div className="trip-list">
       {uTrips.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center", color: "#cbd5e1" }}>
            No upcoming trips found.
          </p>
        ) : (
          uTrips.map((trip) => (
          <div className="trip-item" key={trip.tripId}>
            <div>
              <h6>{trip.title}</h6>
              <small>Travel Package</small>
            </div>
            <span>{formatter.format(new Date(trip.startDate))}</span>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default UpcomingTrips;
