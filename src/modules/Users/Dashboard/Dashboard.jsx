import "./Dashboard.css";
import BackgroundSlider from "../../../components/UserDashboard/BackgroundSlider/BackgroundSlider";
import axiosInstance from "../../../utils/axiosInstance";
import WelcomeBanner from "../../../components/UserDashboard/WelcomeBanner/WelcomeBanner";
import { useState, useEffect } from "react";
import tripService from "../../../services/tripService";
import StatCard from "../../../components/UserDashboard/StatCard/StatCard";
import RecentTrips from "../../../components/UserDashboard/RecentTrips/RecentTrips";
import UpcomingTrips from "../../../components/UserDashboard/UpcomingTrips/UpcomingTrips";
import UserNavbar from "../../../components/UserDashboard/UserNavbar/UserNavbar";
import {
  FaPlaneDeparture,
  FaCalendarAlt,
  FaCheckCircle,
  FaWallet,
  FaTimes,
} from "react-icons/fa";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [transportations, setTransportations] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [companions, setCompanions] = useState([]);
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripData = await tripService.getTripsByUser(user.userId);
        setTrips(tripData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    if (user?.userId) {
      fetchTrips();
    }
  }, [user]);

  const handleViewTrip = async (trip) => {
  try {
    const response = await axiosInstance.get(
      `/api/transportations/trip/${trip.tripId}`
    );
    const accommodationResponse = await axiosInstance.get(
      `/api/accommodations/trip/${trip.tripId}`
    );
    const companionResponse = await axiosInstance.get(
      `/api/trips/${trip.tripId}/companions`
    );
    console.log("Traveller API:", companionResponse.data);

    setTransportations(response.data.data || []);
    setAccommodations(accommodationResponse.data.data || []);
    setCompanions(companionResponse.data.data || companionResponse.data || []);

    setSelectedTrip(trip);
  } catch (error) {
    console.error("Error fetching transportation:", error);
    setTransportations([]);
    setAccommodations([]);
    setCompanions([]);
    setSelectedTrip(trip);
  }
};


const activeTrips = trips.filter(
  (trip) => trip.tripStatus !== "CANCELLED"
);

const upcomingTrips = activeTrips.filter(
  (trip) =>
    trip.tripStatus === "UPCOMING"
);

const completedTrips = activeTrips.filter(
  (trip) => trip.tripStatus === "COMPLETED"
);
  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  return (
    <div className="dashboard-page">
      <BackgroundSlider />

      <div className="dashboard-container">
        <UserNavbar />

        <WelcomeBanner userName={user?.firstName || "Guest"} />

        <div className="stats-container">
          <StatCard
            icon={<FaPlaneDeparture />}
            title="Total Trips"
            value={activeTrips.length}
            color="#2563eb"
          />

          <StatCard
  icon={<FaCalendarAlt />}
  title="Upcoming Trips"
  value={upcomingTrips.length}
  color="#2563eb"
/>

          <StatCard
  icon={<FaCheckCircle />}
  title="Completed Trips"
  value={completedTrips.length}
  color="#2563eb"
/>

          <StatCard
            icon={<FaWallet />}
            title="Travel Budget"
            value={`₹${activeTrips
             .reduce((sum, trip) => sum + (trip.budget || 0), 0)
             .toLocaleString("en-IN")}`}
            color="#2563eb"
          />
        </div>

        <div className="dashboard-grid">
         <RecentTrips
  trips={completedTrips}
  onViewTrip={handleViewTrip}
/>

<UpcomingTrips
   trips={upcomingTrips}
  onViewTrip={handleViewTrip}
/>
        </div>
      </div>

     {/* Full Trip Details Modal */}
{selectedTrip && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div
      className="trip-modal-card large-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <div>
          <h2>{selectedTrip.destination} {selectedTrip.tripType || "Solo"} Vacation</h2>
          <p className="modal-subtitle">
            {selectedTrip.title || "Trip Details"}
          </p>
        </div>

        <button className="close-btn" onClick={handleCloseModal}>
          <FaTimes />
        </button>
      </div>

      <div className="modal-body scrollable-body">
 
        <div className="modal-section">
          <h3>
            <FaPlaneDeparture /> Trip Information
          </h3>

          <div className="modal-grid">

            <div className="detail-box">
              <span className="label">Title</span>
              <span className="value">{selectedTrip.title}</span>
            </div>

            <div className="detail-box">
              <span className="label">Source</span>
              <span className="value">{selectedTrip.source}</span>
            </div>

            <div className="detail-box">
              <span className="label">Destination</span>
              <span className="value">{selectedTrip.destination}</span>
            </div>

            <div className="detail-box">
              <span className="label">Start Date</span>
              <span className="value">{selectedTrip.startDate}</span>
            </div>

            <div className="detail-box">
              <span className="label">End Date</span>
              <span className="value">{selectedTrip.endDate}</span>
            </div>

            <div className="detail-box">
              <span className="label">Budget</span>
              <span className="value">
                ₹{Number(selectedTrip.budget || 0).toLocaleString()}
              </span>
            </div>

            <div className="detail-box">
              <span className="label">Status</span>
              <span className="value">
                {selectedTrip.tripStatus}
              </span>
            </div>

          </div>
        </div>

         <div className="modal-section">
    <h3>Transportation Details</h3>

    {transportations.length > 0 ? (
      transportations.map((transport) => (
        <div className="modal-grid" key={transport.transportationId}>

          <div className="detail-box">
            <span className="label">Transport Type</span>
            <span className="value">{transport.transportType}</span>
          </div>

          <div className="detail-box">
            <span className="label">Provider</span>
            <span className="value">{transport.providerName}</span>
          </div>

          <div className="detail-box">
            <span className="label">Source</span>
            <span className="value">{transport.source}</span>
          </div>

          <div className="detail-box">
            <span className="label">Destination</span>
            <span className="value">{transport.destination}</span>
          </div>

          <div className="detail-box">
            <span className="label">Departure</span>
            <span className="value">
              {transport.departureDate} {transport.departureTime}
            </span>
          </div>

          <div className="detail-box">
            <span className="label">Arrival</span>
            <span className="value">
              {transport.arrivalDate} {transport.arrivalTime}
            </span>
          </div>
            <div className="detail-box">
            <span className="label">Fare</span>
            <span className="value">
              ₹{Number(transport.fare || 0).toLocaleString()}
            </span>
          </div>
          <div className="detail-box">
            <span className="label">Travel Class</span>
            <span className="value">{transport.travelClass}</span>
          </div>

          <div className="detail-box">
            <span className="label">Seat Number</span>
            <span className="value">
              {transport.seatNumber || "N/A"}
            </span>
          </div>

          

        </div>
      ))
    ) : (
      <p>No transportation details available.</p>
    )}
  </div>
<div className="modal-section">

<h3>
🏨 Accommodation Details
</h3>


{accommodations.length > 0 ? (

accommodations.map((stay)=>(
  
<div className="modal-grid" key={stay.accommodationId}>


<div className="detail-box">
<span className="label">
Hotel Name
</span>

<span className="value">
{stay.hotelName}
</span>
</div>


<div className="detail-box">
<span className="label">
Type
</span>

<span className="value">
{stay.accommodationType}
</span>
</div>


<div className="detail-box">
<span className="label">
City
</span>

<span className="value">
{stay.city}
</span>
</div>


<div className="detail-box">
<span className="label">
Check In
</span>

<span className="value">
{stay.checkInDate}
</span>
</div>


<div className="detail-box">
<span className="label">
Check Out
</span>

<span className="value">
{stay.checkOutDate}
</span>
</div>


<div className="detail-box">
<span className="label">
Room Type
</span>

<span className="value">
{stay.roomType}
</span>
</div>


<div className="detail-box">
<span className="label">
Booking Status
</span>

<span className="value highlight">
{stay.bookingStatus}
</span>
</div>


<div className="detail-box">
<span className="label">
Amount
</span>

<span className="value highlight">
₹{Number(stay.bookingAmount || 0)
.toLocaleString("en-IN")}
</span>
</div>


</div>

))

):(


<p>
No accommodation details available.
</p>


)}

</div>
<div className="modal-section">

<h3>
👥 Traveller Details
</h3>


{companions.length > 0 ? (

companions.map((person)=>(

<div className="modal-grid" key={person.companionId}>


<div className="detail-box">
<span className="label">
Name
</span>

<span className="value">
{person.firstName} {person.lastName}
</span>
</div>


<div className="detail-box">
<span className="label">
Relationship
</span>

<span className="value">
<span className="value">
{person.relationship || person.relationshipType || "N/A"}
</span>
</span>
</div>


<div className="detail-box">
<span className="label">
Gender
</span>

<span className="value">
{person.gender || "N/A"}
</span>
</div>
<div className="detail-box">
<span className="label">
Age
</span>

<span className="value">
{person.age || "N/A"}
</span>
</div>

</div>

))

) : (

<p>No traveller details available.</p>

)}

</div>


</div> {/* End of modal-body */}

<div className="modal-footer">
  <button
    className="close-modal-btn"
    onClick={handleCloseModal}
  >
    Close
  </button>
</div>

    </div>
  </div>
)}
  </div>
  );
};

export default Dashboard;
