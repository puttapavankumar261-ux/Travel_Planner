import "./RecentTrips.css";
import {
  FaCalendarAlt,
  FaWallet,
  FaChevronRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// const trips = [
//   {
//     id: 1,
//     destination: "Goa",
//     date: "15 Jul - 20 Jul",
//     budget: "₹18,000",
//     status: "Upcoming",
//   },
//   {
//     id: 2,
//     destination: "Kerala",
//     date: "10 Aug - 16 Aug",
//     budget: "₹24,000",
//     status: "Planned",
//   },
//   {
//     id: 3,
//     destination: "Manali",
//     date: "02 Sep - 08 Sep",
//     budget: "₹30,000",
//     status: "Upcoming",
//   },
// ];

const RecentTrips = ({ trips, onViewTrip }) => {

//console.log("Recent Trips:", trips);
const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
});
  return (
    <div className="recent-trips">
      <div className="section-header">
        <div>
          <h2>Recent Trips</h2>
          <p>Your latest travel plans</p>
        </div>

        <button className="view-all-btn">
          View All
          <FaChevronRight />
        </button>
      </div>

      <div className="trip-list">
         {
                trips.map((trip)=>(
              
          <div className="recent-trip-card" key={trip.tripId}>
            <div className="trip-left">
              <div className="trip-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="trip-info">
                <h6>{trip.title}</h6>
                <p>{trip.source} → {trip.destination} : {formatter.format(new Date(trip.startDate))}</p>
                

                {/* <div className="trip-meta">
                  <span>
                    <FaCalendarAlt />
                    {trip.date}
                  </span>

                  <span>
                    <FaWallet />
                    {trip.budget}
                  </span>
                </div> */}
              </div>
            </div>

            <div className="trip-right">
              <button onClick={()=>onViewTrip(trip)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrips;
