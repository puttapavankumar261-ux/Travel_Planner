import "./TripCard.css";

const TripCard = ({
  destination,
  video,
  startDate,
  endDate,
  budget,
  status,
  onViewDetails,
}) => {
  return (
    <div className="trip-card">
      <div className="trip-media">
        <video
          className="trip-video"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          disableRemotePlayback
          preload="auto"
        >
          {" "}
          <source src={video} type="video/mp4" />
        </video>

        <div className="trip-overlay">
          <h2>{destination}</h2>
          <span className="trip-status">{status}</span>
        </div>
      </div>

      <div className="trip-content">
        <div className="trip-info">
          <p>
            <i className="bi bi-calendar3" style={{ marginRight: "8px" }}></i>
            {startDate} - {endDate}
          </p>

          <p>
            <i className="bi bi-wallet2" style={{ marginRight: "8px" }}></i>
            {budget}
          </p>
        </div>

        <button className="view-trip-btn" onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default TripCard;
