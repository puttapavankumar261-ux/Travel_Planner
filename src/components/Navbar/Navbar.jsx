import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../common/Logo";

function Navbar() {
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

        <button className="icon-btn notification">
          <i className="bi bi-bell"></i>
          <span className="nav-badge">5</span>
        </button>

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
