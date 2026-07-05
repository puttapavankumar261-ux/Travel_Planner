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
    <div className="upcoming-trips glass">
      <div className="section-header">
        <h3>Upcoming Trips</h3>

        <button>View All</button>
      </div>

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
  );
}

export default UpcomingTrips;
