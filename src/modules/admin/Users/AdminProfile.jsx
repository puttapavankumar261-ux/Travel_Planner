import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import StatCard from "../../../components/Dashboard/StatCard/StatCard";
import { Users, Plane, Calendar, IndianRupee } from "lucide-react";
import userService from "../../../services/userService";
import authService from "../../../services/authService";
import {
  Search,
  Mail,
  Edit2,
  Trash2,
  ExternalLink,
  UserPlus,
  Download,
  Eye, Info
} from "lucide-react";
import "./AdminProfile.css";
import adminlogo from "./images/profileimage.png";
const AdminProfile = () => {


  const permissions = [
    "User Management",
    "Trip Management",
    "Booking Management",
    "Payment Management",
    "Reports",
    "userProfile",
  ];


//     {
//       device: "Windows 11",
//       browser: "Chrome",
//       ip: "192.168.1.20",
//       location: "Bangalore",
//       date: "10 Jul 2026 09:30 AM",
//     },
//     {
//       device: "Android",
//       browser: "Chrome",
//       ip: "192.168.1.50",
//       location: "Hyderabad",
//       date: "09 Jul 2026 07:15 PM",
//     },
//     {
//       device: "MacBook",
//       browser: "Safari",
//       ip: "192.168.1.60",
//       location: "Chennai",
//       date: "08 Jul 2026 08:10 AM",
//     },
//   ];

// const stats = [
//     {
//       title: "Total Users",
//       value: "1250",
//       icon: <Users size={30} />,
//       color: "linear-gradient(135deg,#2563EB,#3B82F6)",
//     },
//     {
//       title: "Total Trips",
//       value: "325",
//       icon: <Plane size={30} />,
//       color: "linear-gradient(135deg,#10B981,#22C55E)",
//     },
//     {
//       title: "Bookings",
//       value: "95",
//       icon: <Calendar size={30} />,
//       color: "linear-gradient(135deg,#8B5CF6,#A855F7)",
//     },
//     {
//       title: "Revenue",
//       value: "₹8,45,000",
//       icon: <IndianRupee size={30} />,
//       color: "linear-gradient(135deg,#F59E0B,#FB923C)",
//     },
//   ];

const loggedUser = JSON.parse(
    localStorage.getItem("user"),
    localStorage.getItem("password"),
    localStorage.getItem("token"),
    localStorage.getItem("email")
);

const userId = loggedUser?.userId;
const password = loggedUser?.password;
const token = loggedUser?.token;
const email1 = loggedUser?.email;
//alert(email1);
const email = "hemasri.learning@gmail.com";
const [admin, setAdmin] = useState();
const [isEditing, setIsEditing] = useState(false);
// =======================
// Change Password States
// =======================

const [showPasswordModal, setShowPasswordModal] = useState(false);

const [otpMethod, setOtpMethod] = useState("EMAIL");

const [otpSent, setOtpSent] = useState(false);

const [otpVerified, setOtpVerified] = useState(false);

// const [otp, setOtp] = useState("");

const [loadingOtp, setLoadingOtp] = useState(false);
const [loading, setLoading] = useState(false);

const [savingPassword, setSavingPassword] = useState(false);

const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
});
const [resetOtp, setResetOtp] = useState("");
// const [error, setError] = useState("");
const [errors, setErrors] = useState({});
// const [validationErrors, setValidationErrors] = useState({
//     password: "",
//     confirmPassword: "",
//     otp: ""
// });
const validateOtp = () => {
    let newErrors = {};

    if (!resetOtp.trim()) {
      newErrors.resetOtp = "OTP is required.";
    } else if (!/^\d{6}$/.test(resetOtp)) {
      newErrors.resetOtp = "OTP should be 6 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
const handleSave = async () => {
    try {
        await userService.updateUser(admin.userId, {
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            password :token || "admin123",
            mobileNumber: admin.mobileNumber,
            gender : admin.gender,
            dateOfBirth :admin.dateOfBirth || "1998-05-12",
            preferredLanguage : admin.preferredLanguage,
            preferredCurrency : admin.preferredCurrency,
            roleName : admin.roleName,
            roleId : admin.roleId || 1,
            country : admin.country
        });

        alert("Profile updated successfully.");

        setIsEditing(false);

        adminUser(admin.userId);

    } catch (error) {

        console.error(error);
        alert("Failed to update profile.");

    }
};
const adminUser = async (userId) => {
    try{
       const uadmin = await userService.getUserById(userId);
       //console.log(uadmin)
        setAdmin(uadmin);
    } catch (error) {
        console.error("Failed to load Users:", error);
    } 
}

useEffect(() => {

    if(userId){
        adminUser(userId);
    }

}, [userId]);

const openPasswordModal = () => {

    setShowPasswordModal(true);

    setOtpMethod("EMAIL");

    setOtpSent(false);

    //setOtp("");

    setResetOtp("");

    setPasswordData({
        password: "",
        confirmPassword: ""
    });

    setErrors({});
};

const closePasswordModal = () => {

    setShowPasswordModal(false);

    setOtpSent(false);

    setOtp("");

    setResetOtp("");

    setPasswordData({
        password: "",
        confirmPassword: ""
    });

    setErrors({});
};



const sendPasswordOtp = async () => {

    if(passwordData.password===""){
        setErrors({
            password:"Password is required."
        });
        return;
    }

    if(passwordData.confirmPassword===""){
        setErrors({
            confirmPassword:"Confirm Password is required."
        });
        return;
    }

    if(passwordData.password!==passwordData.confirmPassword){

        setErrors({
            confirmPassword:"Passwords do not match."
        });

        return;
    }

    try{

        setLoadingOtp(true);

        await authService.sendPasswordOtp(email);

        alert("OTP sent successfully.");

        setOtpSent(true);

    }
    catch(err){
        setErrors({
            resetOtp: "Invalid OTP."
        });
        alert("Unable to send OTP.");

    }
    finally{

        setLoadingOtp(false);

    }

};


const handleResetPassword = async () => {

    let validationErrors = {};

    if(!resetOtp){

        validationErrors.resetOtp = "OTP is required.";

    }

    if(passwordData.password===""){

        validationErrors.password="Password is required.";

    }

    if(passwordData.confirmPassword===""){

        validationErrors.confirmPassword="Confirm Password is required.";

    }

    if(passwordData.password!==passwordData.confirmPassword){

        validationErrors.confirmPassword="Passwords do not match.";

    }

    if(Object.keys(validationErrors).length){

        setErrors(validationErrors);

        return;

    }
    
    try{
        if (!validateOtp()) {
            return;
        }
        setLoading(true);
        setErrors({});

        setSavingPassword(true);
        alert(email);
        alert(resetOtp);
        alert(passwordData.password);
        await authService.resetPassword(email,resetOtp, passwordData.password);

        alert("Password has been reset successfully.");

        closePasswordModal();

    }

    catch(error){

        setErrors({

            resetOtp:error?.response?.data?.message || "Invalid OTP."

        });

    }

    finally{
        setLoading(false);
        setSavingPassword(false);

    }

};

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
                    {admin?.firstName +" "+ admin?.lastName}
                </h2>

                <p className="role">
                    {admin?.roleName}
                </p>

                {/* <span className="status active">
                    ● {profile.status}
                </span> */}

                <hr />

                <div className="profile-info">

                    <div className="info-row">
                    <i className="bi bi-envelope-fill"></i>
                    <span>{admin?.email}</span>
                    </div>

                    <div className="info-row">
                    <i className="bi bi-telephone-fill"></i>
                    <span>{admin?.mobileNumber}</span>
                    </div>

                    {/* <div className="info-row">
                    <i className="bi bi-person-badge-fill"></i>
                    <span>{profile.employeeId}</span>
                    </div> */}

                </div>

                {/* <button className="profile-edit-btn">
                    <i className="bi bi-pencil-square"></i>
                    Edit Profile
                </button> */}
                <button
                className="profile-edit-btn"
                onClick={() => setIsEditing(!isEditing)}
                >
                <i className="bi bi-pencil-square"></i>
                {isEditing ? "Cancel" : "Edit"}
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

                

            </aside>

            {/* ================= RIGHT CONTENT ================= */}

            <main className="right-content">

                {/* PERSONAL INFORMATION */}

                <div className="content-card">

                    <div className="card-header">

                        <h3>
                        Personal Information
                        </h3>

                        {/* <button className="edit-small-btn">
                        Edit
                        </button> */}
                        <button
                        className="edit-small-btn"
                        onClick={() => setIsEditing(!isEditing)}
                        >
                        {isEditing ? "Cancel" : "Edit"}
                        </button>

                    </div>

                    <div className="profile-grid">

                        <div className="form-group">
                        <label>First Name</label>
                        {/* <input
                            type="text"
                            value={admin?.firstName}
                            readOnly
                        /> */}
                        <input
                        type="text"
                        value={admin?.firstName || ""}
                        readOnly={!isEditing}
                        onChange={(e) =>
                        setAdmin({
                        ...admin,
                        firstName: e.target.value,
                        })
                        }
                        />
                        </div>

                         

                        <div className="form-group">
                        <label>Last Name</label>
                        {/* <input
                            type="text"
                            value={admin?.lastName}
                            readOnly
                        /> */}
                            <input
                            type="text"
                            value={admin?.lastName || ""}
                            readOnly={!isEditing}
                            onChange={(e) =>
                            setAdmin({
                            ...admin,
                            lastName: e.target.value,
                            })
                            }
                            />
                        </div>

                        <div className="form-group">
                        <label>Email Address</label>
                        {/* <input
                            type="email"
                            value={admin?.email}
                            readOnly
                        /> */}
                            <input
                            type="email"
                            value={admin?.email || ""}
                            readOnly={!isEditing}
                            onChange={(e) =>
                            setAdmin({
                            ...admin,
                            email: e.target.value,
                            })
                            }
                            />
                        </div>

                        <div className="form-group">
                        <label>Mobile Number</label>
                        {/* <input
                            type="text"
                            value={admin?.mobileNumber}
                            readOnly
                        /> */}

                            <input
                            type="text"
                            value={admin?.mobileNumber || ""}
                            readOnly={!isEditing}
                            onChange={(e) =>
                            setAdmin({
                            ...admin,
                            mobileNumber: e.target.value,
                            })
                            }
                            />
                        </div>

                        <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="text"
                            value={admin?.dateOfBirth || "1998-05-12"}
                            readOnly
                        />
                        </div>

                        <div className="form-group">
                        <label>Gender</label>
                        <input
                            type="text"
                            value={admin?.gender || ""}
                            readOnly
                        />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input
                            type="text"
                            value={admin?.roleName || ""}
                            readOnly
                            />
                        </div>
                        <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            value={admin?.country || ""}
                            readOnly
                        />
                        </div>

                    </div>

                    {isEditing && (
                    <div
                    style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                    gap: "10px",
                    }}
                    >
                    <button
                    className="outline-btn"
                    onClick={() => {
                    setIsEditing(false);
                    adminUser(userId); // Reload original data
                    }}
                    >
                    Cancel
                    </button>

                    <button
                    className="profile-edit-btn"
                    onClick={handleSave}
                    >
                    Save Changes
                    </button>
                    </div>
                    )}

                </div>

            

                {/* =================  SECURITY ================= */}
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

                                {/* <button className="outline-btn">
                                Change Password
                                </button> */}
                                <button
                                    className="outline-btn"
                                    onClick={openPasswordModal}
                                >
                                Change Password
                                </button>

                            </div>

                      

                    </div>

                    

                    {showPasswordModal && (
    <div className="password-modal-overlay">

        <div className="password-modal">

            <div className="password-modal-header">

                <h2>Change Password</h2>

                <button
                    className="close-modal-btn"
                    onClick={closePasswordModal}
                > X
                    {/* <X size={22}/> */}
                </button>

            </div>

            <div className="password-modal-body">

                {/* Email */}

                <div className="password-form-group">

                    <label>Email Address</label>

                    <input
                        type="email"
                        value={email || ""}
                        readOnly
                    />

                </div>

                {/* Mobile */}

                <div className="password-form-group">

                    <label>Mobile Number</label>

                    <input
                        type="text"
                        value={admin?.mobileNumber || ""}
                        readOnly
                    />

                </div>

                {/* Radio */}

                <div className="otp-method">

                    <label>Send OTP To</label>

                    <div className="otp-options">

                        <label>

                            <input
                                type="radio"
                                checked={otpMethod==="EMAIL"}
                                onChange={()=>{
                                    setOtpMethod("EMAIL");
                                }}
                            />

                            Email

                        </label>

                        <label>

                            <input
                                type="radio"
                                checked={otpMethod==="MOBILE"}
                                onChange={()=>{
                                    setOtpMethod("MOBILE");
                                }}
                            />

                            Mobile

                        </label>

                    </div>

                    <div className="password-form-group">

    <label>New Password</label>

    <input
        type="password"
        value={passwordData.password}
        onChange={(e)=>setPasswordData({
            ...passwordData,
            password:e.target.value
        })}
    />

   {errors.password && ( <small
        style={{color: "#ef4444",display: "block",marginTop: "6px",fontSize: "13px"}}>
        {errors.password}
        </small>
    )}

</div>

<div className="password-form-group">

    <label>Confirm Password</label>

    <input
        type="password"
        value={passwordData.confirmPassword}
        onChange={(e)=>setPasswordData({
            ...passwordData,
            confirmPassword:e.target.value
        })}
    />

    
    {errors.confirmPassword && ( <small
        style={{color: "#ef4444",display: "block",marginTop: "6px",fontSize: "13px"}}>
        {errors.confirmPassword}
        </small>
    )}

</div>

{!otpSent && (

<button
    className="send-otp-btn"
    onClick={sendPasswordOtp}
    disabled={loadingOtp}
>
{loadingOtp
?
"Sending..."
:
"Send OTP" }

</button>

)}

                </div>

                

                {otpSent && (

<>

<div className="password-form-group">

<label>Enter OTP</label>

<input
    value={resetOtp}     
    onChange={(e)=> {setResetOtp(e.target.value);
        setErrors((prev) => ({
                                ...prev,
                                resetOtp: "",
                                }))
    }}
/>

{errors?.resetOtp && (<small
    style={{color: "#ef4444",display: "block",marginTop: "6px",fontSize: "13px"}}>
    {errors.resetOtp}
</small>
)}

</div>

<button
    className="save-password-btn"
    onClick={handleResetPassword}
    disabled={loading}
>
{loading ? "Submitting..." : "Submit"}

</button>

</>

)}

                

                

            </div>

        </div>

    </div>

                    )}

                </div>

              

                

              

            </main>

            </div>
        </div>
    
    </div>
  );
};

export default AdminProfile;