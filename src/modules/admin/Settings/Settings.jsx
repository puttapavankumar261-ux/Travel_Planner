import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    company: "Travel Planner",
    email: "admin@travelplanner.com",
    phone: "+91 9876543210",
    currency: "INR",
    language: "English",
    darkMode: true,
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-wrapper settings-wrapper">

        <div className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your application preferences and account settings.</p>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className="settings-grid">

          {/* General */}

          <div className="settings-card">

            <h3>General Settings</h3>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={settings.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Support Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Regional */}

          <div className="settings-card">

            <h3>Regional Settings</h3>

            <div className="form-group">
              <label>Currency</label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            <div className="form-group">
              <label>Language</label>

              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
              </select>
            </div>

          </div>

          {/* Preferences */}

          <div className="settings-card">

            <h3>Preferences</h3>

            <div className="toggle-row">
              <span>Dark Mode</span>

              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
              />
            </div>

            <div className="toggle-row">
              <span>Email Notifications</span>

              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Security */}

          <div className="settings-card">

            <h3>Security</h3>

            <div className="form-group">
              <label>Current Password</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type="password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;