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
                <span className="booking-detail-label" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Name</span>
                <span className="booking-detail-value" style={{ fontSize: '16px' }}>{booking.customer}</span>
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
            </div>

            {/* Accommodations */}
            {booking.raw?.accommodations && booking.raw.accommodations.length > 0 && (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Home size={18} /> Accommodations</h3>
                {booking.raw.accommodations.map((acc, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Hotel Name</span>
                      <span className="booking-detail-value">{acc.hotelName}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Address</span>
                      <span className="booking-detail-value">{acc.hotelAddress}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Check-in</span>
                      <span className="booking-detail-value">{acc.checkInDate}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Status</span>
                      <span className="booking-detail-value">{acc.bookingStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Transportations */}
            {booking.raw?.transportations && booking.raw.transportations.length > 0 && (
              <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
                <h3><Plane size={18} /> Transportations</h3>
                {booking.raw.transportations.map((trans, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Provider</span>
                      <span className="booking-detail-value">{trans.providerName}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Route</span>
                      <span className="booking-detail-value">{trans.source} &rarr; {trans.destination}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Departure</span>
                      <span className="booking-detail-value">{trans.departureDate} {trans.departureTime}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="booking-detail-label">Status</span>
                      <span className="booking-detail-value">{trans.transportStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documents */}
            <div className="booking-detail-section" style={{ gridColumn: '1 / -1' }}>
              <h3><FileText size={18} /> Related Documents</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#" className="booking-doc-link" onClick={handleComingSoon}>
                  <FileText size={20} />
                  <span>Invoice_{booking.id}.pdf</span>
                  <Download size={16} style={{marginLeft: 'auto'}} />
                </a>
                
                {(booking.type === 'Flight' || booking.type === 'Tour') && (
                  <a href="#" className="booking-doc-link" onClick={handleComingSoon}>
                    <FileText size={20} />
                    <span>E-Tickets_{booking.customer.split(' ')[0]}.pdf</span>
                    <Download size={16} style={{marginLeft: 'auto'}} />
                  </a>
                )}
              </div>
            </div>
            {/* Admin Actions */}
            <div className="booking-detail-section" style={{ gridColumn: '1 / -1', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <h3><Edit size={18} /> Admin Actions</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                {booking.status !== 'CONFIRMED' && booking.status !== 'UPCOMING' && booking.status !== 'CANCELLED' && (
                  <button onClick={onConfirm} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#10B981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <CheckCircle size={16} /> Confirm Booking
                  </button>
                )}
                {booking.status !== 'CANCELLED' && (
                  <button onClick={onCancel} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <XCircle size={16} /> Cancel Booking
                  </button>
                )}
                <button onClick={handleComingSoon} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Edit size={16} /> Modify Booking
                </button>
                <button onClick={handleComingSoon} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <DollarSign size={16} /> Process Refund
                </button>
                <button onClick={handleComingSoon} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Download size={16} /> Download Invoice
                </button>
                <button onClick={handleComingSoon} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Mail size={16} /> Resend Email
                </button>
                <button onClick={handleComingSoon} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <MessageSquare size={16} /> Add Notes
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
