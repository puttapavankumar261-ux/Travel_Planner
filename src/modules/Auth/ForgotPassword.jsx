import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/styles/Login.css";
import loginBg from "../../assets/images/login-bg.jpg";
import Logo from "../../components/common/Logo";
import authService from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setLoading(true);

      // Call your backend API
      // await authService.forgotPassword({ email });

      // Demo Success Message
      setSuccess(
        "A password reset link has been sent to your registered email address."
      );
    } catch (err) {
      console.error(err);
      setError("Unable to send reset link. Please try again.");
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
      {/* Overlay */}
      <div className="overlay"></div>

      {/* LEFT SIDE */}

      <div className="hero-section">
        <Logo className="brand-logo" />

        <h1>
          <div>plan every journey.</div>
          <div>
            <span>explore without limits.</span>
          </div>
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo
              showTagline={false}
              className="login-card-logo"
            />
          </div>

          <h2>Forgot Password</h2>

          <p className="subtitle">
            Enter your registered email address and we'll send you a password
            reset link.
          </p>

          <form onSubmit={handleForgotPassword}>

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

            {success && (
              <div
                style={{
                  color: "#16a34a",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {success}
              </div>
            )}

            <label>Email Address</label>

            <div className="input-box">
              <i className="bi bi-envelope"></i>

              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <p className="register">
            Remember your password?
            <Link to="/"> Sign In</Link>
          </p>

          <p className="register">
            Don't have an account?
            <Link to="/register"> Create an Account</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;