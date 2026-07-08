import { NavLink } from "react-router-dom";
import "./UserNavbar.css";
import companyLogo from "../../../assets/images/Company-logo.jpg";
import {
  FaHome,
  FaSuitcase,
  FaWallet,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

const UserNavbar = () => {
  return (
    <header className="user-navbar">
      {/* Logo */}

      <div className="navbar-logo">
        <img
          src={companyLogo}
          alt="Travel Planner Logo"
          className="company-logo"
        />

        <div className="logo-text">
          <h2>Travel Planner</h2> <span>Explore • Plan • Enjoy</span>
        </div>
      </div>

      {/* Navigation */}

      <nav className="navbar-links">
        <NavLink to="/user/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/user/trips">
          <FaSuitcase />
          My Trips
        </NavLink>

        <NavLink to="/user/expenses">
          <FaWallet />
          Expenses
        </NavLink>
      </nav>

      {/* Right Section */}

      <div className="navbar-right">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>Pavan</h4>

            <span>Traveller</span>
          </div>

          <FaChevronDown className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
