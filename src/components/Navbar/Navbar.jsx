import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../common/Logo";
import NotificationDropdown from "../../modules/admin/Notifications/NotificationModel";
import { useState, useRef, useEffect } from "react";
function Navbar() {
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef(null);

  // Example notification count
  const notificationCount = 5;
  return (
    <header className="navbar glass">
      <Logo showTagline={false} />

      <nav className="nav-links">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/trips">Trips</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
        <NavLink to="/admin/settings">Settings</NavLink>
        <NavLink to="/admin/admins">Admins</NavLink>
      </nav>

      <div className="nav-actions">
        <button className="icon-btn">
          <i className="bi bi-search"></i>
        </button>
        {/* Notification */}
        <div className="notification-wrapper" ref={notificationRef}>
        <button className="icon-btn notification" onClick={() =>
                      setShowNotification(!showNotification) }>
          <i className="bi bi-bell"></i>
           {notificationCount > 0 && (
          <span className="nav-badge">
            {notificationCount}
           {/* {notificationCount > 99
                          ? "99+"
                          : notificationCount} */}
                          </span> )}
        </button>
         <NotificationDropdown
                    open={showNotification}
                    onClose={() => setShowNotification(false)}
                  />
        </div>
        {/* END Notification */}
      
        <div className="profile">
          <div className="profile-image">
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="profile-info">
            <nav className="nav-links">
                    <NavLink to="/admin/adminprofile">

            <div>Admin</div>
            <small>Administrator</small>
            </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
