import React, { useState } from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import BookingDetailsModal from "./BookingDetailsModal";
import { Search, Filter, Eye, Download, Calendar, Briefcase, CheckCircle, XCircle } from "lucide-react";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import "./Bookings.css";

// --- MOCK DATA ---
const MOCK_BOOKINGS = [
  { id: "BKG-101", customer: "Pavan Kumar", type: "Flight", destination: "Dubai", date: "Aug 12, 2026", amount: "₹45,000", status: "Confirmed", paymentStatus: "Paid" },
  { id: "BKG-102", customer: "Amit Singh", type: "Hotel", destination: "Goa", date: "Jul 20, 2026", amount: "₹18,000", status: "Pending", paymentStatus: "Unpaid" },
  { id: "BKG-103", customer: "Sarah Smith", type: "Tour", destination: "Paris", date: "Sep 05, 2026", amount: "₹2,50,000", status: "Confirmed", paymentStatus: "Paid" },
  { id: "BKG-104", customer: "Rahul Dev", type: "Flight", destination: "London", date: "Oct 10, 2026", amount: "₹65,000", status: "Cancelled", paymentStatus: "Refunded" },
  { id: "BKG-105", customer: "Emily Chen", type: "Tour", destination: "Bali", date: "Nov 15, 2026", amount: "₹1,20,000", status: "Confirmed", paymentStatus: "Paid" },
  { id: "BKG-106", customer: "Rajesh K", type: "Hotel", destination: "Manali", date: "Jul 25, 2026", amount: "₹22,000", status: "Pending", paymentStatus: "Partial" },
];

const MONTHLY_DATA = [
  { name: 'Jan', bookings: 65 }, { name: 'Feb', bookings: 59 }, { name: 'Mar', bookings: 80 },
  { name: 'Apr', bookings: 81 }, { name: 'May', bookings: 56 }, { name: 'Jun', bookings: 95 },
  { name: 'Jul', bookings: 110 }
];

const REVENUE_BY_TYPE = [
  { name: 'Flights', value: 400000, color: '#3B82F6' },
  { name: 'Hotels', value: 300000, color: '#10B981' },
  { name: 'Tours', value: 800000, color: '#8B5CF6' }
];

const RECENT_ACTIVITIES = [
  { id: 1, action: "Booking Confirmed", details: "BKG-101 (Flight to Dubai) was confirmed.", time: "10 mins ago" },
  { id: 2, action: "Payment Received", details: "₹2,50,000 received for BKG-103.", time: "1 hour ago" },
  { id: 3, action: "Booking Cancelled", details: "BKG-104 cancelled by user.", time: "3 hours ago" },
  { id: 4, action: "New Booking", details: "Rajesh K created a new Hotel booking.", time: "5 hours ago" },
];

// --- HELPER COMPONENTS ---
const getStatusBadge = (status) => {
  switch(status) {
    case 'Confirmed': return <span className="badge badge-success">{status}</span>;
    case 'Pending': return <span className="badge badge-warning">{status}</span>;
    case 'Cancelled': return <span className="badge badge-danger" style={{background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px'}}>{status}</span>;
    default: return <span className="badge">{status}</span>;
  }
};

const getPaymentBadge = (status) => {
  switch(status) {
    case 'Paid': return <span className="badge badge-success">{status}</span>;
    case 'Unpaid': return <span className="badge badge-secondary" style={{background: 'rgba(148, 163, 184, 0.15)', color: '#94A3B8', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', border: '1px solid rgba(148, 163, 184, 0.3)'}}>{status}</span>;
    case 'Refunded': return <span className="badge badge-purple">{status}</span>;
    case 'Partial': return <span className="badge badge-warning">{status}</span>;
    default: return <span className="badge">{status}</span>;
  }
};


const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  
  const [selectedBooking, setSelectedBooking] = useState(null); // For Modal

  const filteredBookings = MOCK_BOOKINGS.filter(bkg => {
    const matchesSearch = bkg.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || bkg.status === statusFilter;
    const matchesType = typeFilter === '' || bkg.type === typeFilter;
    const matchesPayment = paymentFilter === '' || bkg.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
  });

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-wrapper bookings-wrapper">
        <div className="page-header top-bar">
          <div>
            <h1 style={{ color: 'white', fontSize: '28px', marginBottom: '8px' }}>Booking Management</h1>
            <p style={{ color: '#9CA3AF' }}>Monitor, manage, and analyze all platform bookings.</p>
          </div>
        </div>

        {/* 1. TOP SUMMARY CARDS */}
        <div className="booking-summary-grid">
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}><Briefcase size={24}/></div>
            <div className="b-content">
              <h3>Total Bookings</h3>
              <p>1,248</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}><Calendar size={24}/></div>
            <div className="b-content">
              <h3>Pending</h3>
              <p>42</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}><CheckCircle size={24}/></div>
            <div className="b-content">
              <h3>Confirmed</h3>
              <p>1,150</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' }}><XCircle size={24}/></div>
            <div className="b-content">
              <h3>Cancelled</h3>
              <p>56</p>
            </div>
          </div>
        </div>

        {/* 2. ANALYTICS SECTION */}
        <div className="analytics-grid">
          <div className="chart-panel">
            <h2 className="chart-header">Bookings Per Month</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ background: '#171F2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-panel">
            <h2 className="chart-header">Revenue by Type</h2>
            <div className="chart-container">
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <PieChart width={220} height={220}>
                  <Pie data={REVENUE_BY_TYPE} cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="none" dataKey="value">
                    {REVENUE_BY_TYPE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{ background: '#171F2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </PieChart>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                {REVENUE_BY_TYPE.map(type => (
                  <div key={type.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: type.color }}></div>
                    <span style={{ color: '#9CA3AF', fontSize: '12px' }}>{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. ADVANCED FILTERS */}
        <div className="advanced-filters">
          <div className="search-bar" style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, Destination..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '12px 14px 12px 42px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none' }}
            />
          </div>
          
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Flight">Flight</option>
            <option value="Hotel">Hotel</option>
            <option value="Tour">Tour</option>
          </select>

          <select className="filter-select" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
            <option value="">Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* 4. BOOKING TABLE */}
        <div className="table-container">
    <table className="bookings-table">

        <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Type & Dest.</th>
                  <th>Travel Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(bkg => (
                  <tr key={bkg.id}>
                    <td><span className="trip-id">{bkg.id}</span></td>
                    <td className="fw-500 text-white">{bkg.customer}</td>
                    <td>
                      <div className="fw-500 text-white">{bkg.type}</div>
                      <div className="text-muted text-sm">{bkg.destination}</div>
                    </td>
                    <td className="text-muted">{bkg.date}</td>
                    <td className="fw-500" style={{color: '#E2E8F0'}}>{bkg.amount}</td>
                    <td>{getStatusBadge(bkg.status)}</td>
                    <td>{getPaymentBadge(bkg.paymentStatus)}</td>
                    <td>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => setSelectedBooking(bkg)}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>No bookings found matching filters.</div>
            )}
          </div>
        </div>
    </table>
</div>

        {/* 5. RECENT ACTIVITIES & EXPORT */}
        <div className="flex-between" style={{ marginTop: '40px', marginBottom: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '20px' }}>Recent Booking Activities</h2>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            <Download size={18} /> Export Report
          </button>
        </div>
        <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {RECENT_ACTIVITIES.map(act => (
              <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', marginBottom: '4px' }}>{act.action}</h4>
                  <p style={{ color: '#9CA3AF', fontSize: '13px' }}>{act.details}</p>
                </div>
                <span style={{ color: '#64748B', fontSize: '12px' }}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RENDER MODAL IF A BOOKING IS SELECTED */}
      <BookingDetailsModal 
        booking={selectedBooking} 
        onClose={() => setSelectedBooking(null)} 
      />

    </div>
  );
};

export default Bookings;
