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
    destination: "Himachal Pradesh",
    video: manaliVideo,
  },
  {
    destination: "Andhra Pradesh",
    video: goaVideo,
  },
  {
    destination: "Varanasi",
    video: ootyVideo,
  },
  {
    destination: "Delhi",
    video: goaVideo,
  },
  {
    destination: "Telangana",
    video: keralaVideo,
  },
];

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTrip, setCancelTrip] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [filter, setFilter] = useState("ALL");
  const fetchTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await tripService.getTripsByUser(user.userId);

      const mergedTrips = response.map((dbTrip) => {
        const existingTrip = staticTrips.find(
          (trip) =>
            trip.destination.toLowerCase() === dbTrip.destination.toLowerCase(),
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
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await tripService.getTripsByUser(user.userId);

        const mergedTrips = response.map((dbTrip) => {
          const existingTrip = staticTrips.find(
            (trip) =>
              trip.destination.toLowerCase() ===
              dbTrip.destination.toLowerCase(),
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
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  const filteredTrips = trips.filter((trip) => {
    switch (filter) {
      case "UPCOMING":
        return trip.tripStatus === "UPCOMING";

      case "ONGOING":
        return trip.tripStatus === "ONGOING";

      case "COMPLETED":
        return trip.tripStatus === "COMPLETED";
      case "PLANNED":
        return trip.tripStatus === "PLANNED";
      case "CANCELLED":
        return trip.tripStatus === "CANCELLED";

      default:
        return true;
    }
  });

  const itemsPerPage = 3;

  // Get current page trips
  const indexOfLastTrip = currentPage * itemsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - itemsPerPage;
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);

  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleViewDetails = async (tripId) => {
    try {
      const tripDetails = await tripService.getTripById(tripId);
      setSelectedTrip(tripDetails);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };
  const handleCancelTrip = (trip) => {
    if (trip.tripStatus === "CANCELLED") return;

    setCancelTrip(trip);

    setCancelReason("");

    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);

    setCancelTrip(null);

    setCancelReason("");
  };

  const submitCancellation = async () => {
    if (!cancelReason.trim()) {
      alert("Please enter cancellation reason.");

      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const request = {
        reason: cancelReason,

        cancelledByUserId: user.userId,

        cancelledByRole: "USER",
      };

      await tripService.cancelTrip(cancelTrip.tripId, request);

      alert("Trip cancelled successfully.");

      closeCancelModal();

      fetchTrips();
    } catch (error) {
      console.error(error);

      alert("Unable to cancel trip.");
    }
  };

  return (
    <div className="trips-page">
      <BackgroundSlider />

      <div className="user-trips-container">
        <UserNavbar />

        <TripsHeader />

        <TripFilters filter={filter} setFilter={setFilter} />

        <div className="trip-grid">
          {currentTrips.map((trip, index) => (
            <TripCard
              key={trip.tripId}
              destination={trip.destination}
              video={trip.video}
              startDate={trip.startDate}
              endDate={trip.endDate}
              budget={trip.budget}
              status={trip.tripStatus}
              trip={trip}
              onViewDetails={() => handleViewDetails(trip.tripId)}
              onCancel={() => handleCancelTrip(trip)}
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
      {showCancelModal && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal">
            <h3>Cancel Trip</h3>

            <p>
              Are you sure you want to cancel
              <strong> {cancelTrip?.destination}</strong>?
            </p>

            <textarea
              rows="4"
              placeholder="Enter cancellation reason..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />

            <div className="cancel-buttons">
              <button onClick={closeCancelModal}>Close</button>

              <button onClick={submitCancellation}>Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
