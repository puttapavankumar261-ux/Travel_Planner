import "./TripFilters.css";
import { FaFilter } from "react-icons/fa";

const TripFilters = ({ filter, setFilter }) => {
  return (
    <div className="trip-filters">
      <div className="filter-group">
        <FaFilter className="filter-icon" />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All Trips</option>
          <option value="PLANNED">Planned</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default TripFilters;

