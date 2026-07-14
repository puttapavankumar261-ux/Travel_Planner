import React from "react";
import "./TripDetailsModal.css";

const TripDetailsModal = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <div className="trip-modal-overlay" onClick={onClose}>
      <div className="trip-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="trip-modal-header">
          <div className="trip-modal-title">
            <h2>{trip.destination} Itinerary Details</h2>
            <span className={`trip-modal-status ${trip.status.toLowerCase()}`}>
              {trip.status}
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
              
              {/* Flight Details Section */}
              {trip.flight && (
                <div className="details-section">
                  <h3>
                    <i className="bi bi-airplane-engines text-primary me-2"></i>
                    Flight Information
                  </h3>
                  
                  <div className="flight-card">
                    {/* Departure Flight */}
                    <div className="flight-row border-bottom pb-3 mb-3">
                      <div className="flight-header">
                        <span className="badge bg-primary-subtle text-primary">Departure</span>
                        <span className="flight-no">{trip.flight.departureNo}</span>
                      </div>
                      
                      <div className="flight-route mt-2">
                        <div className="route-point">
                          <strong className="time">{trip.flight.departureTime}</strong>
                          <span className="airport">{trip.flight.fromCode}</span>
                        </div>
                        
                        <div className="route-arrow">
                          <span className="duration">{trip.flight.duration}</span>
                          <i className="bi bi-arrow-right-short fs-3 text-secondary"></i>
                          <span className="stops">Direct</span>
                        </div>
                        
                        <div className="route-point text-end">
                          <strong className="time">{trip.flight.departureArrival}</strong>
                          <span className="airport">{trip.flight.toCode}</span>
                        </div>
                      </div>
                      
                      <div className="flight-footer mt-2">
                        <span className="airline"><i className="bi bi-shield-check me-1"></i>{trip.flight.airline}</span>
                        <span className="cabin-class">{trip.flight.cabinClass}</span>
                      </div>
                    </div>

                    {/* Return Flight */}
                    {trip.flight.returnNo && (
                      <div className="flight-row">
                        <div className="flight-header">
                          <span className="badge bg-success-subtle text-success">Return</span>
                          <span className="flight-no">{trip.flight.returnNo}</span>
                        </div>
                        
                        <div className="flight-route mt-2">
                          <div className="route-point">
                            <strong className="time">{trip.flight.returnTime}</strong>
                            <span className="airport">{trip.flight.toCode}</span>
                          </div>
                          
                          <div className="route-arrow">
                            <span className="duration">{trip.flight.returnDuration || trip.flight.duration}</span>
                            <i className="bi bi-arrow-right-short fs-3 text-secondary"></i>
                            <span className="stops">Direct</span>
                          </div>
                          
                          <div className="route-point text-end">
                            <strong className="time">{trip.flight.returnArrival}</strong>
                            <span className="airport">{trip.flight.fromCode}</span>
                          </div>
                        </div>
                        
                        <div className="flight-footer mt-2">
                          <span className="airline"><i className="bi bi-shield-check me-1"></i>{trip.flight.airline}</span>
                          <span className="cabin-class">{trip.flight.cabinClass}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hotel Stays Section */}
              {trip.hotel && (
                <div className="details-section mt-4">
                  <h3>
                    <i className="bi bi-building text-primary me-2"></i>
                    Hotel & Accommodation
                  </h3>
                  <div className="hotel-card mt-2">
                    <div className="hotel-info">
                      <h4>{trip.hotel.name}</h4>
                      <p className="hotel-address"><i className="bi bi-geo-alt me-1"></i>{trip.hotel.address}</p>
                    </div>
                    <div className="hotel-meta mt-3">
                      <div className="meta-item">
                        <span className="label">Room Type</span>
                        <strong className="value">{trip.hotel.roomType}</strong>
                      </div>
                      <div className="meta-item">
                        <span className="label">Check In</span>
                        <strong className="value">{trip.hotel.checkIn}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                    <strong className="value text-success">{trip.budget}</strong>
                  </div>
                </div>
              </div>

              {/* Daily Highlights Itinerary */}
              {trip.itinerary && (
                <div className="details-section mt-4">
                  <h3>
                    <i className="bi bi-list-task text-primary me-2"></i>
                    Itinerary Highlights
                  </h3>
                  <div className="itinerary-timeline mt-2">
                    {trip.itinerary.map((day, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-badge">{index + 1}</div>
                        <div className="timeline-content">
                          <h4>Day {index + 1}: {day.title}</h4>
                          <p>{day.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
