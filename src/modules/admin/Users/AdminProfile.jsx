import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import StatCard from "../../../components/Dashboard/StatCard/StatCard";
import { Users, Plane, Calendar, IndianRupee } from "lucide-react";
import {
  Search,
  Mail,
  Edit2,
  Trash2,
  ExternalLink,
  UserPlus,
  Download,
} from "lucide-react";
import "./AdminProfile.css";
import adminlogo from "./images/profileimage.png";
const AdminProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Pavan",
    lastName: "Kumar",
    email: "admin@travelplanner.com",
    mobile: "+91 9876543210",
    dob: "20 Jan 1998",
    gender: "Male",

    username: "admin",
    role: "Super Administrator",
    employeeId: "ADM001",
    status: "Active",

    address: "Whitefield",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    zip: "560066",
  });

  const permissions = [
    "User Management",
    "Trip Management",
    "Booking Management",
    "Payment Management",
    "Reports",
    "Settings",
  ];

  const recentLogins = [
    {
      device: "Windows 11",
      browser: "Chrome",
      ip: "192.168.1.20",
      location: "Bangalore",
      date: "10 Jul 2026 09:30 AM",
    },
    {
      device: "Android",
      browser: "Chrome",
      ip: "192.168.1.50",
      location: "Hyderabad",
      date: "09 Jul 2026 07:15 PM",
    },
    {
      device: "MacBook",
      browser: "Safari",
      ip: "192.168.1.60",
      location: "Chennai",
      date: "08 Jul 2026 08:10 AM",
    },
  ];

const stats = [
    {
      title: "Total Users",
      value: "1250",
      icon: <Users size={30} />,
      color: "linear-gradient(135deg,#2563EB,#3B82F6)",
    },
    {
      title: "Total Trips",
      value: "325",
      icon: <Plane size={30} />,
      color: "linear-gradient(135deg,#10B981,#22C55E)",
    },
    {
      title: "Bookings",
      value: "95",
      icon: <Calendar size={30} />,
      color: "linear-gradient(135deg,#8B5CF6,#A855F7)",
    },
    {
      title: "Revenue",
      value: "₹8,45,000",
      icon: <IndianRupee size={30} />,
      color: "linear-gradient(135deg,#F59E0B,#FB923C)",
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />

        <div className="dashboard-wrapper users-wrapper">
            <div className="profile-page">

            {/* ================= LEFT SIDEBAR ================= */}

            <aside className="left-sidebar">

                {/* Profile Card */}

                <div className="profile-card">

                <div className="profile-cover"></div>
                <img
                    src={adminlogo}
                    alt="Admin"
                    className="profile-image"
                />

                {/* <img
                    src="https://i.pravatar.cc/180?img=12"
                    alt="Admin"
                    className="profile-image"
                /> */}

                <h2>
                    {profile.firstName} {profile.lastName}
                </h2>

                <p className="role">
                    {profile.role}
                </p>

                <span className="status active">
                    ● {profile.status}
                </span>

                <hr />

                <div className="profile-info">

                    <div className="info-row">
                    <i className="bi bi-envelope-fill"></i>
                    <span>{profile.email}</span>
                    </div>

                    <div className="info-row">
                    <i className="bi bi-telephone-fill"></i>
                    <span>{profile.mobile}</span>
                    </div>

                    <div className="info-row">
                    <i className="bi bi-person-badge-fill"></i>
                    <span>{profile.employeeId}</span>
                    </div>

                </div>

                <button className="edit-btn">
                    <i className="bi bi-pencil-square"></i>
                    Edit Profile
                </button>

                </div>

                {/* Permission Card */}

                <div className="permission-card">

                <h3>
                    <i className="bi bi-shield-check"></i>
                    Permissions
                </h3>

                <ul>

                    {permissions.map((item, index) => (
                    <li key={index}>
                        <i className="bi bi-check-circle-fill"></i>
                        {item}
                    </li>
                    ))}

                </ul>

                </div>

                {/*  Quick Stats    */}

                <div className="profile-card quick-stats">
                    <h3>
                        <i className="bi bi-bar-chart-line-fill"></i>
                        Quick Admin Stats
                    </h3>
                    
                    <div className="stats-grid">
                        {/* <div className="stats-grid"> */}
                            {stats.map((card) => (
                                <StatCard key={card.title} {...card} />
                            ))}
                        {/* </div> */}
                    </div>
                </div>

            </aside>

            {/* ================= RIGHT CONTENT ================= */}

            <main className="right-content">

                {/* PERSONAL INFORMATION */}

                <div className="content-card">

                <div className="card-header">

                    <h3>
                    Personal Information
                    </h3>

                    <button className="edit-small-btn">
                    Edit
                    </button>

                </div>

                <div className="profile-grid">

                    <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={profile.firstName}
                        readOnly
                    />
                    </div>

                    <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={profile.lastName}
                        readOnly
                    />
                    </div>

                    <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={profile.email}
                        readOnly
                    />
                    </div>

                    <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        value={profile.mobile}
                        readOnly
                    />
                    </div>

                    <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        value={profile.dob}
                        readOnly
                    />
                    </div>

                    <div className="form-group">
                    <label>Gender</label>
                    <input
                        type="text"
                        value={profile.gender}
                        readOnly
                    />
                    </div>

                </div>

                </div>

                {/* ===================================================== */}
                {/* will continue from here with:                  */}
                {/* Account Information                                   */}
                {/* Security Settings                                     */}
                {/* Contact Details                                       */}
                {/* Recent Login Activity Table                           */}
                {/* Export Default                                        */}
                {/* ===================================================== */}


                        {/* ================= ACCOUNT + SECURITY ================= */}

                <div className="two-column">

                {/* Account Information */}

                <div className="content-card">

                    <div className="card-header">
                    <h3>Account Information</h3>
                    </div>

                    <div className="profile-grid">

                    <div className="form-group">
                        <label>Username</label>
                        <input
                        type="text"
                        value={profile.username}
                        readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <input
                        type="text"
                        value={profile.role}
                        readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Employee ID</label>
                        <input
                        type="text"
                        value={profile.employeeId}
                        readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <input
                        type="text"
                        value={profile.status}
                        readOnly
                        />
                    </div>

                    </div>

                </div>

                {/* Security */}

                <div className="content-card">

                    <div className="card-header">
                    <h3>Security</h3>
                    </div>

                    <div className="security-section">

                    <div className="security-row">

                        <div>

                        <h4>Password</h4>

                        <p>**************</p>

                        </div>

                        <button className="outline-btn">
                        Change Password
                        </button>

                    </div>

                    <div className="security-row">

                        <div>

                        <h4>Two Factor Authentication</h4>

                        <p>Disabled</p>

                        </div>

                        <button className="primary-btn">
                        Enable
                        </button>

                    </div>

                    <div className="security-row">

                        <div>

                        <h4>Account Status</h4>

                        <p className="active-text">
                            Active
                        </p>

                        </div>

                    </div>

                    </div>

                </div>

                </div>

                {/* ================= CONTACT DETAILS ================= */}

                <div className="content-card">

                <div className="card-header">
                    <h3>Contact Details</h3>
                </div>

                <div className="profile-grid">

                    <div className="form-group full-width">

                    <label>Address</label>

                    <input
                        type="text"
                        value={profile.address}
                        readOnly
                    />

                    </div>

                    <div className="form-group">

                    <label>City</label>

                    <input
                        type="text"
                        value={profile.city}
                        readOnly
                    />

                    </div>

                    <div className="form-group">

                    <label>State</label>

                    <input
                        type="text"
                        value={profile.state}
                        readOnly
                    />

                    </div>

                    <div className="form-group">

                    <label>Country</label>

                    <input
                        type="text"
                        value={profile.country}
                        readOnly
                    />

                    </div>

                    <div className="form-group">

                    <label>Zip Code</label>

                    <input
                        type="text"
                        value={profile.zip}
                        readOnly
                    />

                    </div>

                </div>

                </div>

                {/* ================= LOGIN HISTORY ================= */}

                <div className="content-card">

                <div className="card-header">

                    <h3>Recent Login Activity</h3>

                </div>

                <div className="table-responsive">

                    <table className="login-table">

                    <thead>

                        <tr>

                        <th>Device</th>

                        <th>Browser</th>

                        <th>IP Address</th>

                        <th>Location</th>

                        <th>Date</th>

                        </tr>

                    </thead>

                    <tbody>

                        {recentLogins.map((login, index) => (

                        <tr key={index}>

                            <td>{login.device}</td>

                            <td>{login.browser}</td>

                            <td>{login.ip}</td>

                            <td>{login.location}</td>

                            <td>{login.date}</td>

                        </tr>

                        ))}

                    </tbody>

                    </table>

                </div>

                </div>

            </main>

            </div>
        </div>
    
    </div>
  );
};

export default AdminProfile;