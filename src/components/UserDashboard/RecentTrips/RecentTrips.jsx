import "./RecentTrips.css";



const RecentTrips = ({ trips = [] }) => {
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
              <span className={`status ${trip.tripStatus.toLowerCase()}`}>
                {trip.tripStatus}
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
