import "./TripsHeader.css";
import { FaSearch, FaPlus, FaMagic } from "react-icons/fa";

const TripsHeader = () => {
  return (
    <div className="trips-header glass">
      <div className="header-left">
        <h1>My Trips</h1>
        <p>Manage all your travel plans in one place.</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <FaSearch className="header-search-icon" />

          <input type="text" placeholder="Search destination..." />
        </div>

        <button className="recommend-btn">
          <FaMagic />
          Smart Recommendations
        </button>

        <button className="new-trip-btn">
          <FaPlus />
          New Trip
        </button>
      </div>
    </div>
  );
};

export default TripsHeader;
