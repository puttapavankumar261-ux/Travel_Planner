import { useState } from "react";
import "../../assets/styles/Login.css";
import loginBg from "../../assets/images/login-bg.jpg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
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

        <div className="brand">
          <i className="bi bi-airplane-fill"></i>

          <div>
            <h2>Travel Planner</h2>
            <p>your smart travel companion</p>
          </div>
        </div>

        {/* Heading */}

        <h1>
          <div>plan every journey.</div>
         
          <div><span>explore without limits.</span></div>
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
          {/* Logo */}

          <div className="login-logo">
            <i className="bi bi-airplane-fill"></i>

            <span>Travel Planner</span>
          </div>

          <h2>welcome back</h2>

          <p className="subtitle">sign in to continue your journey</p>

          {/* Email */}

          <label>Email Address</label>

          <div className="input-box">
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />{" "}
          </div>

          {/* Password */}

          <label>Password</label>

          <div className="input-box">
            <i className="bi bi-lock"></i>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>

          {/* Options */}

          <div className="login-options">
            <label>
              <input type="checkbox" />
              remember me
            </label>

            <a href="/">forgot password?</a>
          </div>

          {/* Login */}

          <button className="login-btn">sign in</button>

          {/* Divider */}

          <div className="divider">
            <span>or</span>
          </div>

          {/* Google */}

          <button className="google-btn">
            <i className="bi bi-google"></i>
            continue with google
          </button>

          {/* Register */}

          <p className="register">
            new here?
            <a href="/"> create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
