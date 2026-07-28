import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import "../../assets/styles/Login.css";
import "../../assets/styles/Login.css";
import loginBg from "../../assets/images/login-bg.jpg";
import Logo from "../../components/common/Logo";
import authService from "../../services/authService";
import userService from "../../services/userService";

function Registration() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [errors, setErrors] = useState({});

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "MALE",
    country: "",
    preferredLanguage: "English",
    preferredCurrency: "USD",
    roleId: 2,
    loginProvider: "LOCAL",
  });

  const validateStep1 = () => {
    let newErrors = {};

    if (!registerData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }

    if (!registerData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!registerData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(registerData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10 digit mobile number.";
    }

    if (!registerData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
    }

    if (!registerData.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!registerData.country.trim()) {
      newErrors.country = "Country is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    let newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP should be 6 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setRegisterData(prev => ({...prev,[name]:value}));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const sendOtp = async () => {
    if (!validateStep1()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await authService.checkEmail(registerData.email);

      await authService.sendOtp(registerData.email);

      setSuccess("OTP sent successfully.");

      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!validateOtp()) {
      return;
    }
    setLoading(true);
    try {
      await authService.verifyOtp(registerData.email, otp);
      registerData.accountVerified = true;
      setStep(3);
    } catch (err) {
      setError("Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async () => {
    // Password required
    if (!registerData.password) {
      setError("Password is required.");
      return;
    }

    // Confirm password required
    if (!confirmPassword) {
      setError("Please enter Confirm Password.");
      return;
    }
    console.log(registerData.password);
    console.log(confirmPassword);

    // Password match validation
    if (registerData.password !== confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...registerData,
        accountVerified: true,
        roleId: Number(registerData.roleId),
      };

      const res = await authService.register(payload);
      // console.log(res);
      // return false;
      //console.log(registerData)
      //await userService.register(registerData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  /*
          Registration.jsx - Part 2
         
          */
  {
    /* ---------- Timer ----------- */
  }

  useEffect(() => {
    if (step !== 2) return;

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  {
    /* ---------- Resend OTP -------- */
  }

  const resendOtp = async () => {
    setTimer(60);

    await sendOtp();
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${loginBg})` }}>
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
        <div className="login-card" style={{ maxWidth: "550px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Logo showTagline={false} className="login-card-logo" />
          </div>

          <h2>create account</h2>
          <p className="subtitle">sign up to start planning your trips</p>

          {error && (
            <div
              style={{
                color: "#ef4444",
                marginBottom: "15px",
                fontSize: "14px",
                padding: "10px",
                background: "rgba(239, 68, 68, 0.1)",
                borderRadius: "8px",
              }}
            >
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <div>
                {/* Split Names */}
                <div style={{ display: "flex", gap: "10px" }}>
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
                      />
                    </div>
                    {errors.firstName && (
                      <small style={{ color: "#ef4444" }}>
                        {errors.firstName}
                      </small>
                    )}
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
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                    {errors.lastName && (
                      <small style={{ color: "#ef4444" }}>
                        {errors.lastName}
                      </small>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div style={{ gap: "10px", marginTop: "10px" }}>
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
                    {errors.email && (
                      <small style={{ color: "#ef4444" }}>{errors.email}</small>
                    )}
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
                    {errors.mobileNumber && (
                      <small style={{ color: "#ef4444" }}>
                        {errors.mobileNumber}
                      </small>
                    )}
                  </div>
                </div>

                {/* Password (Full Width) */}
                {/* <div style={{ marginTop: '10px' }}>
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
 */}

                {/* DOB & Gender */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label>Date of Birth</label>
                    {/* <div className="input-box">
                                        <input
                                          type="date"
                                          name="dateOfBirth"
                                          value={registerData.dateOfBirth}
                                          onChange={handleChange}
                                          required
                                          style={{ paddingLeft: '15px', color: registerData.dateOfBirth ? 'white' : 'rgba(255,255,255,0.5)' }}
                                        />
                                      </div> */}
                    <div className="input-box">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={registerData.dateOfBirth}
                        onChange={handleChange}
                        style={{
                          paddingLeft: "15px",
                          color: registerData.dateOfBirth
                            ? "white"
                            : "rgba(255,255,255,0.5)",
                        }}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <small
                        style={{
                          color: "#ef4444",
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        {errors.dateOfBirth}
                      </small>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Gender</label>
                    <div className="input-box">
                      <select
                        name="gender"
                        value={registerData.gender}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          color: "white",
                          outline: "none",
                          paddingLeft: "15px",
                        }}
                      >
                        <option value="MALE" style={{ color: "black" }}>
                          Male
                        </option>
                        <option value="FEMALE" style={{ color: "black" }}>
                          Female
                        </option>
                        <option value="OTHER" style={{ color: "black" }}>
                          Other
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Country (Full Width) */}
                <div style={{ marginTop: "10px" }}>
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
                  {errors.country && (
                    <small style={{ color: "#ef4444" }}>{errors.country}</small>
                  )}
                </div>

                {/* upload image (Full Width) */}
                <div className="upload-container">
                  <label>Upload Image</label>
                  <div className="input-box ">
                    <i className="bi bi-person-circle"></i>
                    <input
                      type="file"
                      name="imageUpload"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      placeholder="Image Upload"
                    />
                  </div>
                </div>

                <button
                  className="login-btn"
                  onClick={sendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3>Email Verification</h3>

              <p>
                We have sent an OTP to
                <b> {registerData.email}</b>
              </p>
              <div className="input-box ">
                {/* <input
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e)=>setOtp(e.target.value)}
                          /> */}
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      otp: "",
                    }));
                  }}
                />
                {errors.otp && (
                  <small style={{ color: "#ef4444" }}>{errors.otp}</small>
                )}
              </div>
              <p>
                OTP expires in <b>{timer}</b> seconds
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="login-btn"
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button className="google-btn" onClick={sendOtp}>
                  Resend OTP
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Create Password</h3>

              {/* <div className="input-box">
                      <input
                      type={showPassword?"text":"password"}
                      name="password"
                      value={registerData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      />

                      <button
                      type="button"
                      className="eye-btn"
                      onClick={()=>setShowPassword(!showPassword)}
                      >
                      👁
                      </button>

                      </div> */}

              <div className="input-box">
                <i className="bi bi-lock"></i>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Confirm Password"
                  value={registerData.password}
                  onChange={handleChange}
                  style={{ paddingLeft: "40px" }}
                />
                {/* <input
                                          type={showPassword ? "text" : "password"}
                                          name="password"
                                          value={registerData.password}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                          placeholder="Password"
                                          required
                                        /> */}

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>

              {/*
                      Registration.jsx - Part 3
                      Append this after Part 2 to complete the component.
                      */}
              <div className="input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                {/* <input
                       name="Confirm_Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      /> */}
              </div>
              {confirmPassword && registerData.password !== confirmPassword && (
                <div
                  style={{
                    color: "#ef4444",
                    marginTop: "8px",
                    fontSize: "13px",
                  }}
                >
                  Password and Confirm Password do not match.
                </div>
              )}

              {/* <button
                      className="login-btn"
                      onClick={registerUser}
                      disabled={loading}
                      >
                      {loading ? "Creating Account..." : "Create Account"}
                      </button> */}
              <button
                className="login-btn"
                onClick={registerUser}
                disabled={
                  loading ||
                  !registerData.password ||
                  !confirmPassword ||
                  registerData.password !== confirmPassword
                }
              >
                {" "}
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </>
          )}

          <div className="divider" style={{ marginTop: "20px" }}>
            <span>or</span>
          </div>

          <p className="register">
            Already have an account?
            <Link to="/"> Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
