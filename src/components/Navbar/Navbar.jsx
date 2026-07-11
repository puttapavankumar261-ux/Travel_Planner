import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../common/Logo";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const SIDEBAR_SECTIONS = [
    {
      id: 1,
      title: "Profile Settings",
      icon: "bi-person",
      options: ["Profile Picture", "Full Name", "Email", "Phone Number", "Change Password", "Two-Factor Authentication (Toggle)"]
    },
    {
      id: 2,
      title: "General Settings",
      icon: "bi-globe",
      options: ["Default Language", "Default Currency (₹, $, €, etc.)", "Time Zone", "Date Format"]
    },
    {
      id: 3,
      title: "Appearance",
      icon: "bi-palette",
      options: ["Light Mode / Dark Mode"]
    },
    {
      id: 4,
      title: "Payment Settings",
      icon: "bi-credit-card",
      options: ["Enable/Disable Online Payments", "Supported Payment Methods", "UPI", "Credit Card", "Debit Card", "Net Banking", "Tax Percentage", "Cancellation Fee"]
    },
    {
      id: 5,
      title: "Booking Settings",
      icon: "bi-calendar-check",
      options: ["Maximum Booking Days in Advance", "Minimum Booking Notice", "Auto Confirm Bookings", "Auto Cancel Unpaid Bookings", "Refund Policy"]
    },
    {
      id: 6,
      title: "Trip Settings",
      icon: "bi-map",
      options: ["Default Budget Range", "Default Trip Categories", "Default Currency", "Maximum Travelers per Trip"]
    },
    {
      id: 7,
      title: "Security",
      icon: "bi-shield-lock",
      options: ["Change Password", "Two-Factor Authentication", "Active Login Sessions", "Login History", "Logout from All Devices"]
    },
    {
      id: 8,
      title: "Backup & Restore",
      icon: "bi-hdd",
      options: ["Create Backup", "Download Backup", "Restore Database", "Auto Backup Frequency"]
    },
    {
      id: 9,
      title: "Terms & Policies",
      icon: "bi-file-earmark-text",
      options: ["Privacy Policy", "Terms & Conditions", "Cancellation Policy", "Refund Policy"]
    },
    {
      id: 10,
      title: "About",
      icon: "bi-info-circle",
      options: ["Version Number", "Last Update", "Developer Team", "Contact Support", "License Information"]
    }
  ];

  return (
    <>
      <header className="navbar glass">
        <Logo showTagline={false} />

        <nav className="nav-links">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/trips">Trips</NavLink>
          <NavLink to="/admin/bookings">Bookings</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn">
            <i className="bi bi-search"></i>
          </button>

          <button className="icon-btn notification">
            <i className="bi bi-bell"></i>
            <span className="nav-badge">5</span>
          </button>

          <div className="profile" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
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

      {/* Right Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} 
        onClick={toggleSidebar}
      ></div>

      {/* Right Sidebar */}
      <aside className={`right-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="right-sidebar-header">
          <h3>Admin Settings</h3>
          <button className="close-btn" onClick={toggleSidebar}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="right-sidebar-content">
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.id} className="sidebar-section">
              <div className="sidebar-section-header">
                <i className={`bi ${section.icon}`}></i>
                <span>{section.title}</span>
                <i className="bi bi-chevron-right chevron-icon"></i>
              </div>
              <ul className="sidebar-suboptions">
                {section.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
