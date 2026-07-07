import "./UpcomingTrips.css";

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
        <h2>Upcoming Trips</h2>

        <button className="view-all-btn">View All</button>
      </div>

      {upcomingTrips.map((trip) => (
        <div className="upcoming-card" key={trip.id}>
          <div>
            <h3>{trip.destination}</h3>

            <p>{trip.departure}</p>
          </div>

          <span className="days-left">{trip.daysLeft}</span>
        </div>
      ))}
    </div>
  );
};

export default UpcomingTrips;
