import { NavLink, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import Logo from "../../common/Logo";
import NotificationDropdown from "../../../modules/Users/Notifications/NotificationModel";
import { useState, useRef, useEffect } from "react";
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
   const [showNotification, setShowNotification] = useState(false);
  
    const notificationRef = useRef(null);
  
    // Example notification count
    const notificationCount = 5;

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

        {/* <button className="notification-btn" onClick={()=>navigate('/user/usernotifications')}>
          <FaBell />
          <span className="notification-dot"></span>
        </button> */}

         {/* Notification */}
        <div className="notification-userwrapper" ref={notificationRef}>
        <button className="notification-btn" onClick={() =>
                      setShowNotification(!showNotification) }>
          {/* <i className="bi bi-bell"></i> */}
           <FaBell />
           {notificationCount > 0 && (
          <span className="nav-badge">
            {notificationCount} </span> )}
        </button>
         <NotificationDropdown
                    open={showNotification}
                    onClose={() => setShowNotification(false)}
                  />
        </div>
        {/* END Notification */}
         
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
