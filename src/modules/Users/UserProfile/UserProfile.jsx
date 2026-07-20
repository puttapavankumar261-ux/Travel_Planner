import React from "react";
import userprofileimg from "./images/profileimage.png";
import "./UserProfile.css";

import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";




import {
  FaCamera,
  FaEdit,
  FaPlaneDeparture,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
  FaStar,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaPlus,
  FaUserFriends,
  FaCreditCard,
  FaUniversity,
  FaBell,
  FaLock,
  FaSignOutAlt,
  FaEye,
  FaCog
} from "react-icons/fa";



const UserProfile = () => {

  const stats = [
    {
      icon: <FaPlaneDeparture />,
      title: "Upcoming Trips",
      value: "04",
      color: "#0077ff"
    },
    {
      icon: <FaCheckCircle />,
      title: "Completed Trips",
      value: "26",
      color: "#27ae60"
    },
    {
      icon: <FaTimesCircle />,
      title: "Cancelled Trips",
      value: "02",
      color: "#e74c3c"
    },
    {
      icon: <FaWallet />,
      title: "Wallet Balance",
      value: "₹5,250",
      color: "#f39c12"
    }
  ];

  const travellers = [
  {
    id: 1,
    name: "Pavan",
    relation: "Self",
    age: 28,
    gender: "male"
  },
  {
    id: 2,
    name: "Ramu",
    relation: "Father",
    age: 58,
    gender: "Male"
  },
  {
    id: 3,
    name: "Lakshmi",
    relation: "Mother",
    age: 54,
    gender: "Female"
  }
];

  const bookings = [
  {
    id: "BK1001",
    route: "Bangalore → Goa",
    date: "22 Aug 2026",
    status: "Confirmed"
  },
  {
    id: "BK1002",
    route: "Delhi → Jaipur",
    date: "18 Jul 2026",
    status: "Completed"
  },
  {
    id: "BK1003",
    route: "Mysore → Ooty",
    date: "10 Jun 2026",
    status: "Cancelled"
  }
];

  return (
    <div className="user-profile-page">
           <BackgroundSlider />
    <div className="user-profile-container">
       
        <UserNavbar />
      {/* ================= HEADER ================= */}
      <div className="summary-grid">
      <div className="profile-header">

        <div className="profile-left">

          <div className="profile-image">

            <img
              src={userprofileimg}
              alt="Profile"
            />

            <button className="camera-btn">
              <FaCamera />
            </button>

          </div>

        </div>

        <div className="profile-right">

          <div className="welcome">

            <h4>Welcome Back,</h4>

            <h1>Pavan</h1>

            <p>pavan@gmail.com</p>

            <p>+91 9876543210</p>

          </div>

          <div className="membership">

            <div className="premium">

              <FaStar />

              <span>Premium Member</span>

            </div>

            <h3>Reward Points : 2350</h3>

            <button className="edit-btn">

              <FaEdit />

              Edit Profile

            </button>

          </div>

        </div>

      </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="stats-container">

        {
          stats.map((item, index) => (

            <div
              className="stat-card"
              key={index}
            >

              <div
                className="stat-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>

              <div className="stat-content">

                <h2>{item.value}</h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))
        }

      </div>

        {/* ================= PERSONAL INFORMATION ================= */}

        <div className="profile-details">

            <div className="personal-card">

                <div className="card-header">

                    <h2>Personal Information</h2>

                    <button className="small-edit-btn">

                        <FaEdit />

                        Edit

                    </button>

                </div>

                <div className="info-grid">

                    <div className="info-item">

                        <FaUser className="info-icon" />

                        <div>

                            <label>Full Name</label>

                            <p>Pavan</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaEnvelope className="info-icon" />

                        <div>

                            <label>Email</label>

                            <p>pavan@gmail.com</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaPhoneAlt className="info-icon" />

                        <div>

                            <label>Mobile</label>

                            <p>+91 9876543210</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaVenusMars className="info-icon" />

                        <div>

                            <label>Gender</label>

                            <p>Male</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaBirthdayCake className="info-icon" />

                        <div>

                            <label>Date of Birth</label>

                            <p>20 June 1995</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaMapMarkerAlt className="info-icon" />

                        <div>

                            <label>Address</label>

                            <p>

                                Whitefield<br/>

                                Bangalore, Karnataka

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= SAVED TRAVELLERS ================= */}

            <div className="traveller-card">

                <div className="card-header">

                    <h2>

                        <FaUserFriends />

                        Saved Travellers

                    </h2>

                    <button className="add-btn">

                        <FaPlus />

                        Add Traveller

                    </button>

                </div>

                <div className="traveller-list">

                    {
                        travellers.map((traveller)=>(
                            <div
                                className="traveller-row"
                                key={traveller.id}
                            >

                                <div className="traveller-avatar">

                                    {traveller.name.charAt(0)}

                                </div>

                                <div className="traveller-info">

                                    <h4>{traveller.name}</h4>

                                    <p>

                                        {traveller.relation}

                                        {" | "}

                                        {traveller.age} Years

                                        {" | "}

                                        {traveller.gender}

                                    </p>

                                </div>

                                <button className="edit-traveller">

                                    <FaEdit />
                                    <span>Edit</span>
                                </button>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>

        {/* ================= RECENT BOOKINGS ================= */}

        <div className="booking-card">

            <div className="card-header">

                <h2>Recent Bookings</h2>

            </div>

            <table className="booking-table">

                <thead>

                    <tr>

                        <th>Booking ID</th>

                        <th>Trip</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        bookings.map((booking)=>(
                            <tr key={booking.id}>

                                <td>{booking.id}</td>

                                <td>{booking.route}</td>

                                <td>{booking.date}</td>

                                <td>

                                    <span
                                        className={`status ${booking.status.toLowerCase()}`}
                                    >
                                        {booking.status}
                                    </span>

                                </td>

                                <td>

                                    <button className="view-btn">

                                        <FaEye />

                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>

{/* ================= PAYMENT & SETTINGS ================= */}

        <div className="bottom-grid">

            {/* PAYMENT */}

            <div className="payment-card">

                <div className="card-header">

                    <h2>Payment Methods</h2>

                </div>

                <div className="payment-item">

                    <FaCreditCard className="payment-icon"/>

                    <div>

                        <h4>Visa Card</h4>

                        <p>**** **** **** 4521</p>

                    </div>

                </div>

                <div className="payment-item">

                    <FaUniversity className="payment-icon"/>

                    <div>

                        <h4>UPI</h4>

                        <p>pavan@ybl</p>

                    </div>

                </div>

                <div className="payment-item">

                    <FaWallet className="payment-icon"/>

                    <div>

                        <h4>Travel Wallet</h4>

                        <p>₹5,250 Available</p>

                    </div>

                </div>

            </div>

            {/* SETTINGS */}

            <div className="settings-card">

                <div className="card-header">

                    <h2>Account Settings</h2>

                </div>

                <button className="setting-btn">

                    <FaLock />

                    Change Password

                </button>

                <button className="setting-btn">

                    <FaBell />

                    Notification Preferences

                </button>

                <button className="setting-btn">

                    <FaCog />

                    Privacy Settings

                </button>

                <button className="setting-btn logout">

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </div>

    </div>

    </div>
  );

};

export default UserProfile;