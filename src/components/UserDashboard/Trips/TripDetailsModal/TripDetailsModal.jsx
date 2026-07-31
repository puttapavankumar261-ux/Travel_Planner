import React, { useEffect, useState } from "react";
import "./TripDetailsModal.css"; 
import tripCompanionService from "../../../../services/tripCompanionService";
const TripDetailsModal = ({ trip, onClose }) => {
  if (!trip) return null;
const transport = trip.transportations?.[0];
const hotel = trip.accommodations?.[0];
const user = JSON.parse(localStorage.getItem("user"));
const [travellers, setTravellers] = useState([]);
useEffect(() => {
  const fetchTravellers = async () => {
    try {
      const response = await tripCompanionService.getCompanions(trip.tripId);

      console.log("Trip ID:", trip.tripId);
      console.log("Travellers Response:", response);

      setTravellers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Traveller API Error:", err);
    }
  };

  if (trip?.tripId) {
    fetchTravellers();
  }
}, [trip]);
const status = trip.tripStatus;
  return (
    <div className="trip-modal-overlay" onClick={onClose}>
      <div className="trip-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="trip-modal-header">
          <div className="trip-modal-title">
            <h2>{trip.destination} Itinerary Details</h2>
            <span className={`trip-modal-status ${status.toLowerCase()}`}>
  {status}
</span>
          </div>
          <button className="trip-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="trip-modal-body">
          <div className="trip-details-grid">
            
            {/* Left Column: Flight & Hotel Info */}
            <div className="details-left">
              
              {/* Transport Details Section */}

              
  <div className="details-section">
  <h3>
    <i className="bi bi-bus-front text-primary me-2"></i>
    Transportation Details
  </h3>

  <div className="transport-card">

    <div className="overview-row">
      <span className="label">Transport Type</span>
      <strong>{transport?.transportType || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Provider</span>
      <strong>{transport?.provider || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Source</span>
      <strong>{transport?.source || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Destination</span>
      <strong>{transport?.destination || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Departure</span>
      <strong>{transport?.departureTime || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Arrival</span>
      <strong>{transport?.arrivalTime || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Travel Class</span>
      <strong>{transport?.travelClass || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Seat Number</span>
      <strong>{transport?.seatNumber || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Fare</span>
      <strong>{transport?.fare ? `₹${transport.fare}` : "-"}</strong>
    </div>

  </div>
</div>


              {/* Hotel Stays Section */}
              <div className="details-section mt-4">
  <h3>
    <i className="bi bi-building text-primary me-2"></i>
    Accommodation Details
  </h3>

  <div className="hotel-card">

    <div className="overview-row">
      <span className="label">Hotel Name</span>
      <strong>{hotel?.hotelName || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Accommodation Type</span>
      <strong>{hotel?.accommodationType || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">City</span>
      <strong>{hotel?.city || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Check In</span>
      <strong>{hotel?.checkIn || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Check Out</span>
      <strong>{hotel?.checkOut || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Room Type</span>
      <strong>{hotel?.roomType || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Booking Status</span>
      <strong>{hotel?.bookingStatus || "-"}</strong>
    </div>

    <div className="overview-row">
      <span className="label">Amount</span>
      <strong>{hotel?.amount ? `₹${hotel.amount}` : "-"}</strong>
    </div>

  </div>
</div>
            </div>

            {/* Right Column: Itinerary & Budget Breakdown */}
            <div className="details-right">
              
              {/* Trip Overview */}
              <div className="details-section">
                <h3>
                  <i className="bi bi-calendar3 text-primary me-2"></i>
                  Trip Overview
                </h3>
                <div className="overview-card mt-2">
                  <div className="overview-row">
                    <span className="label">Destination</span>
                    <strong className="value text-white">{trip.destination}</strong>
                  </div>
                  <div className="overview-row">
                    <span className="label">Dates</span>
                    <strong className="value text-white">{trip.startDate} - {trip.endDate}</strong>
                  </div>
                  <div className="overview-row">
                    <span className="label">Total Budget</span>
                    <strong className="value text-success">₹{trip.budget}</strong>
                  </div>
                </div>
              </div>
    {/*Traveller Details Section */}
              {travellers.length > 0 && (
  <div className="details-section mt-4">
    <h3>
      <i className="bi bi-people-fill text-primary me-2"></i>
      Traveller Details
    </h3>

    {travellers.map((traveller, index) => (
      <div className="hotel-card mb-3" key={index}>

        <div className="overview-row">
          <span className="label">Name</span>
          <strong>{traveller.firstName}</strong>
        </div>

        <div className="overview-row">
          <span className="label">Relationship</span>
          <strong>{traveller.relationship}</strong>
        </div>

        <div className="overview-row">
          <span className="label">Gender</span>
          <strong>{traveller.gender}</strong>
        </div>

        <div className="overview-row">
          <span className="label">Age</span>
          <strong>{traveller.age}</strong>
        </div>

      </div>
    ))}
  </div>
)}
              {/* Help & Support */}
              <div className="details-section mt-4 support-box">
                <h4><i className="bi bi-telephone-fill me-2"></i>24/7 Travel Support</h4>
                <p className="mb-0 text-secondary" style={{ fontSize: "14px" }}>
                  Need help with your bookings? Reach out to support at: <strong className="text-white">+1 (800) 555-0199</strong> or mail to <strong className="text-white">support@travelplanner.com</strong>
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TripDetailsModal;
