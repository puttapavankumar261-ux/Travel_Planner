import "./RecentTrips.css";

const trips = [
  {
    id: 1,
    destination: "Goa",
    date: "15 Jul - 20 Jul",
    budget: "₹18,000",
    status: "Upcoming",
  },
  {
    id: 2,
    destination: "Kerala",
    date: "10 Aug - 16 Aug",
    budget: "₹24,000",
    status: "Planned",
  },
  {
    id: 3,
    destination: "Manali",
    date: "02 Sep - 08 Sep",
    budget: "₹30,000",
    status: "Upcoming",
  },
];

const RecentTrips = () => {
  return (
    <div className="recent-trips">
      <div className="section-header">
        <h2>Recent Trips</h2>
        <button className="view-all-btn">View All</button>
      </div>

      {trips.map((trip) => (
        <div className="trip-card" key={trip.id}>
          <div className="trip-info">
            <h3>{trip.destination}</h3>

            <p>{trip.date}</p>

            <span>{trip.budget}</span>
          </div>

          <div className="trip-right">
            <span className="status">{trip.status}</span>

            <button>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTrips;
