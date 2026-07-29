import React from 'react';
import { X, FileText, Download, CreditCard, User, MapPin, CheckCircle, XCircle, Edit, DollarSign, Mail, MessageSquare, Home, Plane } from 'lucide-react';

const BookingDetailsModal = ({ booking, onClose, onConfirm, onCancel }) => {
  if (!booking) return null;

  const handleComingSoon = () => alert("This feature is coming soon!");

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="booking-modal-header">
          <h2>Booking Reference: {booking.id}</h2>
          <button className="booking-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="booking-modal-body">
          <div className="booking-detail-grid">
            
            {/* Customer & Itinerary */}
            <div className="booking-detail-section">
              <h3><User size={18} /> Customer & Itinerary</h3>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trip Title</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.raw?.title || 'N/A'}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Name</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.customer}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.raw?.userEmail || 'N/A'}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trip Created At</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.raw?.createdAt ? new Date(booking.raw.createdAt).toLocaleString() : 'N/A'}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Booking Type</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.type}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Route (Source &rarr; Destination)</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>
                  <MapPin size={14} style={{display:'inline', marginRight:'4px'}}/>
                  {booking.raw?.source || 'N/A'} &rarr; {booking.destination}
                </span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Travel Dates</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.date}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trip Description</span>
                <span className="booking-detail-value" style={{ fontSize: '14px', lineHeight: '1.5', color: '#D1D5DB' }}>{booking.raw?.description || 'No description provided.'}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Booking Status</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>
                  {booking.status === 'UPCOMING' ? 'UPCOMING (Confirmed)' : booking.status}
                </span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="booking-detail-section">
              <h3><CreditCard size={18} /> Payment Information</h3>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Amount</span>
                <span className="booking-detail-value" style={{color: '#10B981', fontWeight: 'bold', fontSize: '18px'}}>{booking.amount}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Status</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.paymentStatus}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Method</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.paymentStatus === 'Paid' ? 'Credit Card' : 'N/A'}</span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Transaction ID</span>
                <span className="booking-detail-value" style={{fontFamily: 'monospace', fontSize: '15px'}}>
                  {booking.raw?.bookings && booking.raw.bookings.length > 0 ? booking.raw.bookings[booking.raw.bookings.length - 1].bookingReference || 'N/A' : 'N/A'}
                </span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Remarks</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>
                  {booking.raw?.bookings && booking.raw.bookings.length > 0 ? booking.raw.bookings[booking.raw.bookings.length - 1].remarks || 'N/A' : 'N/A'}
                </span>
              </div>
              <div className="booking-detail-row">
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Booked At</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>
                  {booking.raw?.bookings && booking.raw.bookings.length > 0 && booking.raw.bookings[booking.raw.bookings.length - 1].bookedAt ? new Date(booking.raw.bookings[booking.raw.bookings.length - 1].bookedAt).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>

            {/* Accommodations */}
            {booking.raw?.accommodations && booking.raw.accommodations.length > 0 ? (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Home size={18} /> Accommodations</h3>
                {booking.raw.accommodations.map((acc, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Hotel Name</span><span className="booking-detail-value">{acc.hotelName}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Address</span><span className="booking-detail-value">{acc.hotelAddress}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Room Type</span><span className="booking-detail-value">{acc.roomType || 'N/A'}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Check-in</span><span className="booking-detail-value">{acc.checkInDate}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Check-out</span><span className="booking-detail-value">{acc.checkOutDate || 'N/A'}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Status</span><span className="booking-detail-value">{acc.bookingStatus}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Booking Ref (PNR)</span><span className="booking-detail-value">{acc.bookingReference || 'N/A'}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Booking Amount</span><span className="booking-detail-value">{acc.bookingAmount ? `₹${acc.bookingAmount.toLocaleString()}` : 'N/A'}</span></div>
                      <div style={{ flex: 1 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Home size={18} /> Accommodations</h3>
                <p style={{ color: '#9CA3AF' }}>No accommodations found for this trip.</p>
              </div>
            )}

            {/* Transportations */}
            {booking.raw?.transportations && booking.raw.transportations.length > 0 ? (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Plane size={18} /> Transportations</h3>
                {booking.raw.transportations.map((trans, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Provider</span><span className="booking-detail-value">{trans.providerName}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Transport Type</span><span className="booking-detail-value">{trans.transportType || 'N/A'} ({trans.travelClass || 'N/A'})</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Route</span><span className="booking-detail-value">{trans.source} &rarr; {trans.destination}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Departure</span><span className="booking-detail-value">{trans.departureDate} {trans.departureTime}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Arrival</span><span className="booking-detail-value">{trans.arrivalDate || 'N/A'} {trans.arrivalTime || ''}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Status</span><span className="booking-detail-value">{trans.transportStatus}</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Ticket / PNR</span><span className="booking-detail-value">{trans.ticketNumber || trans.bookingReference || 'N/A'}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Seat Number</span><span className="booking-detail-value">{trans.seatNumber || 'N/A'}</span></div>
                      <div style={{ flex: 1 }}><span className="booking-detail-label">Fare</span><span className="booking-detail-value">{trans.fare ? `₹${trans.fare.toLocaleString()}` : 'N/A'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Plane size={18} /> Transportations</h3>
                <p style={{ color: '#9CA3AF' }}>No transportations found for this trip.</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
