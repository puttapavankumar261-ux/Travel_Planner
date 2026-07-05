import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar glass">
      <div className="logo">
        <span className="logo-icon">✈</span>
        <div>
          <h2>Travel Planner</h2>
          <small>Explore • Plan • Enjoy</small>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/trips">Trips</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>

      <div className="nav-actions">
        <button className="icon-btn">
          <i className="bi bi-search"></i>
        </button>

        <button className="icon-btn notification">
          <i className="bi bi-bell"></i>
          <span className="badge">5</span>
        </button>

        <div className="profile">
          <div className="profile-image">
            <i className="bi bi-person-fill"></i>
          </div>

          <div className="profile-info">
            <span>Admin</span>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
