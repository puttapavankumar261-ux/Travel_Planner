import "./TripFilters.css";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";

const TripFilters = () => {
  return (
    <div className="trip-filters">
      <div className="filter-group">
        <FaFilter className="filter-icon" />

        <select>
          <option>All Trips</option>
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="filter-group">
        <FaSortAmountDown className="filter-icon" />

        <select>
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Budget</option>
          <option>Destination</option>
        </select>
      </div>
    </div>
  );
};

export default TripFilters;
