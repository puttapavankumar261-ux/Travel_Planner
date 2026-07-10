import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/styles/Login.css";
import loginBg from "../../assets/images/login-bg.jpg";
import Logo from "../../components/common/Logo";
import authService from "../../services/authService";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "MALE", // Default value for enum
    country: "",
    preferredLanguage: "English",
    preferredCurrency: "USD",
    roleId: 2, // Default user role
    loginProvider: "LOCAL",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // The backend expects these fields formatted properly
      const payload = {
        ...registerData,
        roleId: Number(registerData.roleId)
      };
      
      await authService.register(payload);
      
      // On success, redirect to login
      navigate("/");
    } catch (err) {
      // Show backend validation message if available
      if (err.response && err.response.data && err.response.data.message) {
         setError(err.response.data.message);
      } else if (err.response && err.response.data && typeof err.response.data === 'object') {
         // Handle Spring Boot validation map
         const errors = Object.values(err.response.data).join(", ");
         setError(errors || "Registration failed. Please check your details.");
      } else {
         setError("Registration failed. Please check your details.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      <div className="overlay"></div>

      {/* LEFT SIDE HERO (Same as Login) */}
      <div className="hero-section">
        <Logo className="brand-logo" />
        <h1>
          start your journey.
          <br />
          <span>join us today.</span>
        </h1>
        <p className="hero-description">
          discover new destinations, plan smart itineraries, track expenses and
          organize every detail of your trip — all in one place.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <i className="bi bi-map"></i>
            <div>
              <h5>destination explorer</h5>
              <p>find places to visit</p>
            </div>
          </div>
          <div className="feature-card">
            <i className="bi bi-calendar-event"></i>
            <div>
              <h5>smart itinerary</h5>
              <p>plan your schedule</p>
            </div>
          </div>
          <div className="feature-card">
            <i className="bi bi-wallet2"></i>
            <div>
              <h5>budget tracker</h5>
              <p>manage your budget</p>
            </div>
          </div>
          <div className="feature-card">
            <i className="bi bi-suitcase-lg"></i>
            <div>
              <h5>trip organizer</h5>
              <p>keep everything in sync</p>
            </div>
          </div>
        </div>

        <div className="quote-card">
          <i className="bi bi-quote"></i>
          <p>
            the journey of a thousand miles
            <br />
            begins with a single step.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE REGISTRATION */}
      <div className="login-section">
        <div className="login-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo showTagline={false} className="login-card-logo" />
          </div>

          <h2>create account</h2>
          <p className="subtitle">sign up to start planning your trips</p>

          <form onSubmit={handleRegister}>
            {error && (
              <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px", padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                {error}
              </div>
            )}

            {/* Split Names */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>First Name</label>
                <div className="input-box">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label>Last Name</label>
                <div className="input-box">
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    style={{ paddingLeft: '15px' }}
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
               <div style={{ flex: 1 }}>
                 <label>Email Address</label>
                 <div className="input-box">
                   <i className="bi bi-envelope"></i>
                   <input
                     type="email"
                     name="email"
                     value={registerData.email}
                     onChange={handleChange}
                     placeholder="Email"
                     required
                   />
                 </div>
               </div>
               <div style={{ flex: 1 }}>
                 <label>Mobile Number</label>
                 <div className="input-box">
                   <i className="bi bi-telephone"></i>
                   <input
                     type="tel"
                     name="mobileNumber"
                     value={registerData.mobileNumber}
                     onChange={handleChange}
                     placeholder="10-digit number"
                     required
                   />
                 </div>
               </div>
            </div>

            {/* Password & DOB */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>Password</label>
                <div className="input-box">
                  <i className="bi bi-lock"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label>Date of Birth</label>
                <div className="input-box">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={registerData.dateOfBirth}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '15px', color: registerData.dateOfBirth ? 'white' : 'rgba(255,255,255,0.5)' }}
                  />
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
               <div style={{ flex: 1 }}>
                 <label>Gender</label>
                 <div className="input-box">
                   <select 
                     name="gender" 
                     value={registerData.gender} 
                     onChange={handleChange}
                     style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none', paddingLeft: '15px' }}
                   >
                     <option value="MALE" style={{color: 'black'}}>Male</option>
                     <option value="FEMALE" style={{color: 'black'}}>Female</option>
                     <option value="OTHER" style={{color: 'black'}}>Other</option>
                   </select>
                 </div>
               </div>
               <div style={{ flex: 1 }}>
                 <label>Country</label>
                 <div className="input-box">
                   <i className="bi bi-globe"></i>
                   <input
                     type="text"
                     name="country"
                     value={registerData.country}
                     onChange={handleChange}
                     placeholder="Country"
                     required
                   />
                 </div>
               </div>
            </div>

            <button type="submit" className="login-btn" style={{ marginTop: '20px' }} disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          <div className="divider" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <span>or sign in with</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="google-btn" style={{ flex: 1, padding: '12px' }}>
              <i className="bi bi-google"></i> Google
            </button>
            <button className="google-btn" style={{ flex: 1, padding: '12px', background: '#000', color: 'white' }}>
              <i className="bi bi-apple"></i> Apple
            </button>
          </div>

          <p className="register" style={{ marginTop: '20px' }}>
            already have an account?
            <Link to="/"> login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
