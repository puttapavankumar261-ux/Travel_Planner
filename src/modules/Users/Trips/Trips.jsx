import React, { useState, useEffect } from "react";
import tripService from "../../../services/tripService";
import "./Trips.css";

import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import TripsHeader from "../../../components/UserDashboard/Trips/TripsHeader/TripsHeader";
import TripFilters from "../../../components/UserDashboard/Trips/TripFilters/TripFilters";
import TripCard from "../../../components/UserDashboard/Trips/TripCard/TripCard";
import Pagination from "../../../components/UserDashboard/Trips/Pagination/Pagination";
import TripDetailsModal from "../../../components/UserDashboard/Trips/TripDetailsModal/TripDetailsModal";

import goaVideo from "../../../assets/videos/Trips/goa.mp4";
import keralaVideo from "../../../assets/videos/Trips/kerala.mp4";
import manaliVideo from "../../../assets/videos/Trips/manali.mp4";
import ootyVideo from "../../../assets/videos/Trips/ooty.mp4";

const staticTrips = [
  {
    destination: "Goa",
    video: goaVideo,

  },
  {
    destination: "Kerala",
    video: keralaVideo,

  },
  {
    destination: "Manali",
    video: manaliVideo,

  },
  {
    destination: "Ooty",
    video: ootyVideo,

  },
  {
    destination: "Jaipur",
    video: goaVideo,

  },
  {
    destination: "Shimla",
    video: manaliVideo,

  },
  {
    destination: "Rishikesh",
    video: keralaVideo,

  },
  {
    destination: "Darjeeling",
    video: manaliVideo,

  },
  {
    destination: "Agra",
    video: goaVideo,

  },
  {
    destination: "Varanasi",
    video: ootyVideo,

  },
  {
    destination: "Udaipur",
    video: goaVideo,

  },
  {
    destination: "Andaman",
    video: keralaVideo,

  },
];
const getTripStatus = (trip) => {
  const today = new Date();
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);

  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Keep cancelled trips from database
  if (trip.tripStatus === "CANCELLED") {
    return "CANCELLED";
  }

  if (endDate < today) {
    return "COMPLETED";
  }

  if (startDate <= today && endDate >= today) {
    return "ONGOING";
  }

  return "PLANNED";
};


const Trips = () => {

  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  useEffect(() => {

    
    const fetchTrips = async () => {

  try {

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await tripService.getTripsByUser(user.userId);


    const mergedTrips = response.map((dbTrip) => {

      const existingTrip = staticTrips.find(
        (trip) =>
          trip.destination.toLowerCase() ===
          dbTrip.destination.toLowerCase()
      );


      return {
        ...existingTrip,

        ...dbTrip,

        tripId: dbTrip.tripId,

        destination: dbTrip.destination,

        startDate: dbTrip.startDate,

        endDate: dbTrip.endDate,

        budget: `₹${dbTrip.budget}`,

        
      };

    });


    setTrips(mergedTrips);


  } catch(error) {

    console.error("Error fetching trips:", error);

  }

};


    fetchTrips();

  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sortBy]);
const filteredTrips = trips.filter((trip) => {
  const status = getTripStatus(trip);

  switch (filter) {
    case "UPCOMING":
      return status === "PLANNED" || status === "ONGOING";

    case "COMPLETED":
      return status === "COMPLETED";

    case "CANCELLED":
      return status === "CANCELLED";

    default:
      return true;
  }
});

const sortedTrips = [...filteredTrips].sort((a, b) => {
  switch (sortBy) {
    case "NEWEST":
      return new Date(b.startDate) - new Date(a.startDate);

    case "OLDEST":
      return new Date(a.startDate) - new Date(b.startDate);

    case "BUDGET":
      return (
        Number(b.budget.replace(/[₹,]/g, "")) -
        Number(a.budget.replace(/[₹,]/g, ""))
      );

    case "DESTINATION":
      return a.destination.localeCompare(b.destination);

    default:
      return 0;
  }
});



  const itemsPerPage = 3;
  const totalPages = Math.ceil(sortedTrips.length / itemsPerPage);

  // Get current page trips
  const indexOfLastTrip = currentPage * itemsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - itemsPerPage;


const currentTrips = sortedTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
const handleViewDetails = async (tripId) => {
  try {
    const tripDetails = await tripService.getTripById(tripId);

    console.log("Trip Details:", tripDetails);
    console.log("Trip ID:", tripDetails.tripId);
    console.log("Trip Status:", tripDetails.tripStatus);
    console.log("Destination:", tripDetails.destination);

    setSelectedTrip(tripDetails);
  } catch (error) {
    console.error("Error fetching trip details:", error);
  }
};
  return (
    <div className="trips-page">
      <BackgroundSlider />

      <div className="user-trips-container">
        <UserNavbar />

        <TripsHeader />

        <TripFilters
  filter={filter}
  setFilter={setFilter}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>

        <div className="trip-grid">
          {currentTrips.map((trip, index) => (
            <TripCard
              key={trip.tripId}
              destination={trip.destination}
              video={trip.video}
              startDate={trip.startDate}
              endDate={trip.endDate}
              budget={trip.budget}
              status={getTripStatus(trip)}
              onViewDetails={() => handleViewDetails(trip.tripId)}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <TripDetailsModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};

export default Trips;
