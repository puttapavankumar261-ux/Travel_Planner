import "./WelcomeBanner.css";

function WelcomeBanner() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (
    <section className="welcome-banner glass">
      <div className="welcome-left">
        <div className="wave-icon">👋</div>

        <div>
          <h1>Welcome back, Admin!</h1>

          <p>Here's what's happening with your Travel Planner today.</p>
        </div>
      </div>

      <div className="welcome-date">
        <i className="bi bi-calendar-event"></i>

        <span>{today.toLocaleDateString("en-IN", options)}</span>
      </div>
    </section>
  );
}

export default WelcomeBanner;
