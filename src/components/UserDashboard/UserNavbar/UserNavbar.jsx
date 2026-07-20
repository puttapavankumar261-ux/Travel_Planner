import { NavLink, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import Logo from "../../common/Logo";
import {
  FaHome,
  FaSuitcase,
  FaWallet,
  FaBell,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

const UserNavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="user-navbar">
      {/* Logo */}

      <Logo />

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
        <button 
          className="create-trip-btn" 
          onClick={() => navigate('/user/trips/new')}
          style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '500', cursor: 'pointer', marginRight: '15px' }}
        >
          + New Trip
        </button>

        <button className="notification-btn">
          <FaBell />
          <span className="notification-dot"></span>
        </button>
         
        <div className="user-profile" onClick={()=> navigate('/user/userprofile')}>
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
