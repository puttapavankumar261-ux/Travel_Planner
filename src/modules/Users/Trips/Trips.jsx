import "./Trips.css";

import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import TripsHeader from "../../../components/UserDashboard/Trips/TripsHeader/TripsHeader";
import TripFilters from "../../../components/UserDashboard/Trips/TripFilters/TripFilters";
import TripCard from "../../../components/UserDashboard/Trips/TripCard/TripCard";
import Pagination from "../../../components/UserDashboard/Trips/Pagination/Pagination";

import goaVideo from "../../../assets/videos/Trips/goa.mp4";
import keralaVideo from "../../../assets/videos/Trips/kerala.mp4";
import manaliVideo from "../../../assets/videos/Trips/manali.mp4";
import ootyVideo from "../../../assets/videos/Trips/ooty.mp4";

const trips = [
  {
    destination: "Goa",
    video: goaVideo,
    startDate: "15 Jul 2026",
    endDate: "20 Jul 2026",
    budget: "₹18,000",
    status: "Upcoming",
  },
  {
    destination: "Kerala",
    video: keralaVideo,
    startDate: "10 Aug 2026",
    endDate: "16 Aug 2026",
    budget: "₹24,000",
    status: "Planned",
  },
  {
    destination: "Manali",
    video: manaliVideo,
    startDate: "02 Sep 2026",
    endDate: "08 Sep 2026",
    budget: "₹30,000",
    status: "Upcoming",
  },
  {
    destination: "Ooty",
    video: ootyVideo,
    startDate: "15 Oct 2026",
    endDate: "20 Oct 2026",
    budget: "₹16,000",
    status: "Completed",
  },
];

const Trips = () => {
  return (
    <div className="trips-page">
      <BackgroundSlider />

      <div className="trips-container">
        <UserNavbar />

        <TripsHeader />

        <TripFilters />

        <div className="trip-grid">
          {trips.map((trip, index) => (
            <TripCard
              key={index}
              destination={trip.destination}
              video={trip.video}
              startDate={trip.startDate}
              endDate={trip.endDate}
              budget={trip.budget}
              status={trip.status}
            />
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default Trips;
