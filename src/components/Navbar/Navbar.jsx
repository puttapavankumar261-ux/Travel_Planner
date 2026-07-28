import { NavLink,useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../common/Logo";
import NotificationDropdown from "../../modules/admin/Notifications/NotificationModel";
import { useState, useRef, useEffect } from "react";
function Navbar() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef(null);

  // Example notification count
  const notificationCount = 5;

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("password");

    // optional clear everything
    // localStorage.clear();

    navigate("/");

  };
  return (
    <header className="navbar glass">
      <Logo showTagline={false} />

      <nav className="nav-links">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/admins">Admins</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/trips">Trips</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
        {/* <NavLink to="/admin/settings">Settings</NavLink> */}
        
      </nav>

      <div className="nav-actions">
      <button 
      className="logout-btn"
      onClick={handleLogout}
      >
      <i className="bi bi-box-arrow-right"></i>
      Logout
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
