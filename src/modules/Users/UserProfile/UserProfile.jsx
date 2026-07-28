import React, { useEffect, useState } from "react";
import tripService from "../../../services/tripService";
import userService from "../../../services/userService";
import userprofileimg from "./images/profileimage.png";
import "./UserProfile.css";
import tripCompanionService from "../../../services/tripCompanionService";
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
        const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
        const [trips, setTrips] = useState([]);
        const [showEditProfile, setShowEditProfile] = useState(false);
        const [editProfile, setEditProfile] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        mobileNumber: user?.mobileNumber || "",
        gender: user?.gender || "",
        dateOfBirth: user?.dateOfBirth || "",
        country: user?.country || "",
        preferredLanguage: user?.preferredLanguage || "",
        preferredCurrency: user?.preferredCurrency || "",
    });



       
         

  const fetchTrips = async () => {
    try {
      const tripData = await tripService.getTripsByUser(user.userId);
      setTrips(tripData);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
const fetchTravellers = async () => {
    try {

        const trips = await tripService.getTripsByUser(user.userId);

        let allCompanions = [];

        for (const trip of trips) {

            const companions =
                await tripCompanionService.getCompanions(trip.tripId);

            console.log("Companions:", companions);

            if (Array.isArray(companions)) {
                allCompanions = [
                    ...allCompanions,
                    ...companions
                ];
            }
        }

        const uniqueTravellers = allCompanions.filter(
            (traveller, index, self) =>
                index === self.findIndex(
                    t =>
                        t.firstName === traveller.firstName &&
                        t.lastName === traveller.lastName &&
                        t.relationship === traveller.relationship &&
                        t.age === traveller.age
                )
        );

        setTravellers(uniqueTravellers);

    } catch (err) {
        console.error("Error fetching travellers:", err);
    }
};
useEffect(() => {
  if (user?.userId) {
    fetchTrips();
    fetchTravellers();
  }
}, [user]);
 const stats = [
  {
    icon: <FaPlaneDeparture />,
    title: "Upcoming Trips",
    value: trips.filter(
      trip =>
        trip.tripStatus === "PLANNED" ||
        trip.tripStatus === "ONGOING"
    ).length,
    color: "#0077ff",
  },
  {
    icon: <FaCheckCircle />,
    title: "Completed Trips",
    value: trips.filter(
      trip => trip.tripStatus === "COMPLETED"
    ).length,
    color: "#27ae60",
  },
  {
    icon: <FaTimesCircle />,
    title: "Cancelled Trips",
    value: trips.filter(
      trip => trip.tripStatus === "CANCELLED"
    ).length,
    color: "#e74c3c",
  },
  {
    icon: <FaWallet />,
    title: "Travel Budget",
    value: `₹${trips
      .reduce((sum, trip) => sum + (trip.budget || 0), 0)
      .toLocaleString()}`,
    color: "#f39c12",
  },
];

  const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (
    month < 0 ||
    (month === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
const calculateRewardPoints = () => {
  let points = 0;

  trips.forEach((trip) => {
    if (trip.tripStatus === "COMPLETED") {
      points += 300;
    } else if (trip.tripStatus === "CANCELLED") {
      points -= 100;
    }
  });

  return Math.max(points, 0); // Prevent negative points
};
    const [travellers, setTravellers] = useState([]);

  const rewardPoints = calculateRewardPoints();

const isPremium = rewardPoints >= 1000;
const handleProfileChange = (e) => {
    setEditProfile({
        ...editProfile,
        [e.target.name]: e.target.value,
    });
};

const handleUpdateProfile = async () => {
    try {
        const updatedUser = await userService.updateProfile(
            user.userId,
            editProfile
        );

        setUser(updatedUser);

            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Profile Updated Successfully");

            setShowEditProfile(false);

    } catch (error) {
        console.error(error);
        alert("Failed to update profile");
    }
};

  return (
    
    <div className="user-profile-page">
        
    <BackgroundSlider />
    
    {showEditProfile && (
        <div className="modal-overlay">

            <div className="modal">
                    
        
                <h2>Edit Profile</h2>
    <input
    type="text"
    name="firstName"
    value={editProfile.firstName}
    onChange={handleProfileChange}
    placeholder="First Name"
    />
    <input
    type="text"
    name="lastName"
    value={editProfile.lastName}
    onChange={handleProfileChange}
    placeholder="Last Name"
    />          

    <input
    type="email"
    name="email"
    value={editProfile.email}
    onChange={handleProfileChange}
    placeholder="Email"
/>

<input
    type="text"
    name="mobileNumber"
    value={editProfile.mobileNumber}
    onChange={handleProfileChange}
    placeholder="Mobile Number"
/>

<select
    name="gender"
    value={editProfile.gender}
    onChange={handleProfileChange}
>
    <option value="">Select Gender</option>
    <option value="MALE">Male</option>
    <option value="FEMALE">Female</option>
    <option value="OTHER">Other</option>
</select>

<input
    type="date"
    name="dateOfBirth"
    value={editProfile.dateOfBirth}
    onChange={handleProfileChange}
/>

<input
    type="text"
    name="country"
    value={editProfile.country}
    onChange={handleProfileChange}
    placeholder="Country"
/>
<input
    type="text"
    name="preferredLanguage"
    value={editProfile.preferredLanguage}
    onChange={handleProfileChange}
    placeholder="Preferred Language"
/>


<input
    type="text"
    name="preferredCurrency"
    value={editProfile.preferredCurrency}
    onChange={handleProfileChange}
    placeholder="Preferred Currency"
/>
    <div className="modal-buttons">

    <button onClick={handleUpdateProfile}>
        Save
    </button>

    <button onClick={() => setShowEditProfile(false)}>
        Cancel
    </button>

    </div>
            </div>

        </div>
    )}


<UserNavbar />



    <div className="user-profile-container">

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

            <h2>
    {user ? `${user.firstName} ${user.lastName}` : "Guest"}
  </h2>

            <p>{user?.email}</p>

            <p>{user?.mobileNumber}</p>

          </div>

          <div className="membership">

            <div className={`premium ${isPremium ? "active-premium" : ""}`}>

              <FaStar />

              <span> {isPremium ? "Premium Member" : "Regular Member"}</span>

            </div>

            <h3> Reward Points : {rewardPoints}</h3>

            <button
 className="edit-btn"
 onClick={() => {
    console.log("Edit clicked");
    setShowEditProfile(true);
 }}
>
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
  
                </div>

                <div className="info-grid">

                    <div className="info-item">

                        <FaUser className="info-icon" />

                        <div>

                            <label>Full Name</label>

                            <p>{user.firstName} {user.lastName}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaEnvelope className="info-icon" />

                        <div>

                            <label>Email</label>

                            <p>{user.email}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaPhoneAlt className="info-icon" />

                        <div>

                            <label>Mobile</label>

                            <p>{user?.mobileNumber || "Not Provided"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaVenusMars className="info-icon" />

                        <div>

                            <label>Gender</label>

                            <p>{user?.gender || "Not Specified"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaBirthdayCake className="info-icon" />

                        <div>

                            <label>Date of Birth</label>

                            <p>{user?.dateOfBirth || "Not Provided"}</p>

                        </div>

                    </div>

                    <div className="info-item">

                        <FaMapMarkerAlt className="info-icon" />

                        <div>

                            <label>Country</label>

                            <p>{user?.country || "Whitefield, Bangalore, Karnataka"}</p>

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

                    

                </div>

                <div className="traveller-list">

                    {
                        travellers.map((traveller)=>(
                            <div
                                className="traveller-row"
                                key={traveller.companionId}
                            >

                                <div className="traveller-avatar">

                                    {traveller.firstName?.charAt(0)}

                                </div>

                                <div className="traveller-info">

                                    <h4>{traveller.firstName} {traveller.lastName}</h4>

                                    <p>

                                        {traveller.relationship}

                                        {" | "}

                                        {traveller.age} Years

                                        {" | "}

                                        {traveller.gender}

                                    </p>

                                </div>

                               
                            </div>
                        ))
                    }

                </div>

            </div>

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