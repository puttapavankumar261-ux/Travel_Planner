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
        {trips.map((trip) => (
          <div className="recent-trip-card" key={trip.id}>
            <div className="trip-left">
              <div className="trip-icon">
                <i className="bi bi-geo-alt"></i>
              </div>

              <div className="trip-info">
                <h3>{trip.destination}</h3>

                <div className="trip-meta">
                  <span>
                    <i className="bi bi-calendar3"></i>
                    {trip.date}
                  </span>

                  <span>
                    <i className="bi bi-wallet2"></i>
                    {trip.budget}
                  </span>
                </div>
              </div>
            </div>

            <div className="trip-right">
              <span className={`status ${trip.status.toLowerCase()}`}>
                {trip.status}
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
