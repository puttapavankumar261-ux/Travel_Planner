import "./WelcomeBanner.css";

const WelcomeBanner = ({ userName }) => {
  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <h1>
          Welcome Back, <span>{userName}</span> 👋
        </h1>

        <p>
          Ready for your next adventure? Plan your trips and create
          unforgettable memories.
        </p>

      
      </div>
    </section>
  );
};

export default WelcomeBanner;
