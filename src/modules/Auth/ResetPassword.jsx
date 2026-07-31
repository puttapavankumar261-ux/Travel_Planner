import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../../assets/styles/Login.css";
import loginBg from "../../assets/images/login-bg.jpg";
import Logo from "../../components/common/Logo";
import authService from "../../services/authService";

function ResetPassword() {
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");
    const otp = searchParams.get("otp");
   console.log(email);
   console.log(otp);
  const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [passwordData, setPasswordData] = useState({
  password: "",
  confirmPassword: "",
});

const [error, setError] = useState("");

const navigate = useNavigate();

const handleChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

const handleResetPassword = async (e) => {
  e.preventDefault();

  setError("");

  if (passwordData.password !== passwordData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }
   
  try {

    await authService.resetPassword(email,otp,passwordData.password);

    alert("Password reset successfully.");

    navigate("/");

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Unable to reset password."
    );
  }
};
  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* LEFT SIDE */}

      <div className="hero-section">
        {/* Logo */}

        <Logo className="brand-logo" />

        {/* Heading */}

        <h1>
          <div>plan every journey.</div>

          <div>
            <span>explore without limits.</span>
          </div>
        </h1>

        {/* Description */}

        <p className="hero-description">
          discover new destinations, plan smart itineraries, track expenses and
          organize every detail of your trip — all in one place.
        </p>

        {/* Feature Cards */}

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

        {/* Statistics */}

        <div className="statistics">
          <div className="stat">
            <i className="bi bi-flag"></i>

            <h3>4+</h3>

            <span>destinations</span>
          </div>

          <div className="stat">
            <i className="bi bi-calendar-check"></i>

            <h3>15+</h3>

            <span>trips planned</span>
          </div>

          <div className="stat">
            <i className="bi bi-emoji-smile"></i>

            <h3>100%</h3>

            <span>user satisfaction</span>
          </div>
        </div>

        {/* Quote */}

        <div className="quote-card">
          <i className="bi bi-quote"></i>

          <p>
            the journey of a thousand miles
            <br />
            begins with a single step.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="login-section">
          <div className="login-card">

  <div style={{ display: "flex", justifyContent: "center" }}>
    <Logo showTagline={false} className="login-card-logo" />
  </div>

  <h2>Reset Password</h2>

  <p className="subtitle">
    Create a new password for your account
  </p>

  <form onSubmit={handleResetPassword}>

    {error && (
      <div
        style={{
          color: "#ef4444",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      >
        {error}
      </div>
    )}

    <label>New Password</label>

    <div className="input-box">
      <i className="bi bi-lock"></i>

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={passwordData.password}
        onChange={handleChange}
        placeholder="Enter new password"
      />

      <button
        type="button"
        className="eye-btn"
        onClick={() => setShowPassword(!showPassword)}
      >
        <i
          className={
            showPassword
              ? "bi bi-eye-slash"
              : "bi bi-eye"
          }
        ></i>
      </button>
    </div>

    <label>Confirm Password</label>

    <div className="input-box">
      <i className="bi bi-lock"></i>

      <input
        type={
          showConfirmPassword
            ? "text"
            : "password"
        }
        name="confirmPassword"
        value={passwordData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm new password"
      />

      <button
        type="button"
        className="eye-btn"
        onClick={() =>
          setShowConfirmPassword(
            !showConfirmPassword
          )
        }
      >
        <i
          className={
            showConfirmPassword
              ? "bi bi-eye-slash"
              : "bi bi-eye"
          }
        ></i>
      </button>
    </div>

    <button
      type="submit"
      className="login-btn"
      style={{ marginTop: "20px" }}
    >
      Reset Password
    </button>

  </form>

  <p className="register" style={{ marginTop: "20px" }}>
    Remember your password?
    <Link to="/"> Sign In</Link>
  </p>

</div>
      </div>
    </div>
  );
}

export default ResetPassword;
