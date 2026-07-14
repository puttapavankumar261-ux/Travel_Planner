import "./UpcomingTrips.css";

const trips = [
  {
    id: 1,
    place: "Goa",
    date: "12 Jul",
  },
  {
    id: 2,
    place: "Kerala",
    date: "18 Jul",
  },
  {
    id: 3,
    place: "Ooty",
    date: "24 Jul",
  },
  {
    id: 4,
    place: "Manali",
    date: "29 Jul",
  },
];

function UpcomingTrips() {
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
        {trips.map((trip) => (
          <div className="trip-item" key={trip.id}>
            <div>
              <h4>{trip.place}</h4>
              <small>Travel Package</small>
            </div>
            <span>{trip.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingTrips;
