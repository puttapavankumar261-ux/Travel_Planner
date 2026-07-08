import "./TripCard.css";
import { FaCalendarAlt, FaWallet } from "react-icons/fa";

const TripCard = ({
  destination,
  video,
  startDate,
  endDate,
  budget,
  status,
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
            <FaCalendarAlt />
            {startDate} - {endDate}
          </p>

          <p>
            <FaWallet />
            {budget}
          </p>
        </div>

        <button className="view-trip-btn">View Details</button>
      </div>
    </div>
  );
};

export default TripCard;
