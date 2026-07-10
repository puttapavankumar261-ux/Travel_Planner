import React from 'react';
import { X, FileText, Download, CreditCard, User, MapPin, CheckCircle, XCircle, Edit, DollarSign, Mail, MessageSquare } from 'lucide-react';

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Booking Reference: {booking.id}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="detail-grid">
            
            {/* Customer & Itinerary */}
            <div className="detail-section">
              <h3><User size={18} /> Customer & Itinerary</h3>
              <div className="detail-row">
                <span className="detail-label">Customer Name</span>
                <span className="detail-value">{booking.customer}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Booking Type</span>
                <span className="detail-value">{booking.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Destination</span>
                <span className="detail-value"><MapPin size={14} style={{display:'inline', marginRight:'4px'}}/>{booking.destination}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Travel Dates</span>
                <span className="detail-value">{booking.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Booking Status</span>
                <span className="detail-value">{booking.status}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="detail-section">
              <h3><CreditCard size={18} /> Payment Information</h3>
              <div className="detail-row">
                <span className="detail-label">Total Amount</span>
                <span className="detail-value" style={{color: '#10B981', fontWeight: 'bold'}}>{booking.amount}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Status</span>
                <span className="detail-value">{booking.paymentStatus}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">Credit Card (**** 4242)</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Transaction ID</span>
                <span className="detail-value" style={{fontFamily: 'monospace'}}>TXN-998273645</span>
              </div>
            </div>

            {/* Documents */}
            <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
              <h3><FileText size={18} /> Related Documents</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#" className="doc-link" onClick={(e) => e.preventDefault()}>
                  <FileText size={20} />
                  <span>Invoice_{booking.id}.pdf</span>
                  <Download size={16} style={{marginLeft: 'auto'}} />
                </a>
                
                {(booking.type === 'Flight' || booking.type === 'Tour') && (
                  <a href="#" className="doc-link" onClick={(e) => e.preventDefault()}>
                    <FileText size={20} />
                    <span>E-Tickets_{booking.customer.split(' ')[0]}.pdf</span>
                    <Download size={16} style={{marginLeft: 'auto'}} />
                  </a>
                )}
              </div>
            </div>
            {/* Admin Actions */}
            <div className="detail-section" style={{ gridColumn: '1 / -1', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
              <h3><Edit size={18} /> Admin Actions</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#10B981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <CheckCircle size={16} /> Confirm Booking
                </button>
                <button className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <XCircle size={16} /> Cancel Booking
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Edit size={16} /> Modify Booking
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <DollarSign size={16} /> Process Refund
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Download size={16} /> Download Invoice
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <Mail size={16} /> Resend Email
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
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
