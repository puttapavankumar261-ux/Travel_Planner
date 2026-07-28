import React, { useState, useEffect, useMemo } from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import BookingDetailsModal from "./BookingDetailsModal";
import tripService from "../../../services/tripService";
import { Search, Filter, Eye, Download, Calendar, Briefcase, CheckCircle, XCircle } from "lucide-react";
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import "./Bookings.css";

// --- HELPER COMPONENTS ---
const getStatusBadge = (status) => {
  if (!status) return <span className="badge">Unknown</span>;
  switch(status.toUpperCase()) {
    case 'CONFIRMED':
    case 'PLANNED': 
      return <span className="badge badge-success">{status}</span>;
    case 'PENDING': return <span className="badge badge-warning">{status}</span>;
    case 'CANCELLED': return <span className="badge badge-danger" style={{background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px'}}>{status}</span>;
    default: return <span className="badge">{status}</span>;
  }
};

const getPaymentBadge = (status) => {
  if (!status) return <span className="badge">Unknown</span>;
  switch(status.toUpperCase()) {
    case 'PAID': return <span className="badge badge-success">{status}</span>;
    case 'UNPAID':
    case 'PENDING': 
      return <span className="badge badge-secondary" style={{background: 'rgba(148, 163, 184, 0.15)', color: '#94A3B8', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', border: '1px solid rgba(148, 163, 184, 0.3)'}}>{status}</span>;
    case 'REFUNDED': return <span className="badge badge-purple">{status}</span>;
    case 'PARTIAL': return <span className="badge badge-warning">{status}</span>;
    default: return <span className="badge">{status}</span>;
  }
};

const getRelativeTime = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "Just now";
  let interval = seconds / 31536000;
  if (interval >= 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval >= 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval >= 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval >= 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  return Math.floor(interval) + " mins ago";
};

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  
  const [selectedBooking, setSelectedBooking] = useState(null); // For Modal

  const [bookingsData, setBookingsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleConfirm = async (trip) => {
    if (!window.confirm(`Are you sure you want to confirm booking TRP-${trip.tripId}?`)) return;
    try {
      const formatDate = (d) => {
        if (!d) return new Date().toISOString().split('T')[0];
        if (Array.isArray(d)) return `${d[0]}-${String(d[1]).padStart(2, '0')}-${String(d[2]).padStart(2, '0')}`;
        if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
        return d;
      };

      const payload = {
        title: trip.title || 'Untitled Trip',
        source: trip.source || 'User Location',
        destination: trip.destination || 'Not Specified',
        startDate: formatDate(trip.startDate),
        endDate: formatDate(trip.endDate),
        budget: trip.budget || 10000.0,
        description: trip.description || 'Confirmed via Admin Panel',
        travelerName: trip.travelerName || 'Unknown',
        tripType: trip.tripType || 'TOUR',
        tripStatus: 'UPCOMING',
        userId: trip.userId || 1
      };
      await tripService.updateTrip(trip.tripId, payload);
      setBookingsData(prev => prev.map(b => b.id === `TRP-${trip.tripId}` ? {...b, status: 'UPCOMING', raw: {...b.raw, tripStatus: 'UPCOMING'}} : b));
      if (selectedBooking && selectedBooking.id === `TRP-${trip.tripId}`) {
          setSelectedBooking(null);
      }
      alert("Booking confirmed successfully!");
    } catch (err) {
      console.error("Failed to confirm trip", err);
      let msg = "Failed to confirm booking.";
      if (err.response && err.response.data) {
          msg += " Server says: " + JSON.stringify(err.response.data);
      }
      alert(msg);
    }
  };

  const handleCancel = async (trip) => {
    if (!window.confirm(`Are you sure you want to CANCEL booking TRP-${trip.tripId}? This action cannot be undone.`)) return;
    try {
      const formatDate = (d) => {
        if (!d) return new Date().toISOString().split('T')[0];
        if (Array.isArray(d)) return `${d[0]}-${String(d[1]).padStart(2, '0')}-${String(d[2]).padStart(2, '0')}`;
        if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
        return d;
      };

      const payload = {
        title: trip.title || 'Untitled Trip',
        source: trip.source || 'User Location',
        destination: trip.destination || 'Not Specified',
        startDate: formatDate(trip.startDate),
        endDate: formatDate(trip.endDate),
        budget: trip.budget || 10000.0,
        description: trip.description || 'Cancelled via Admin Panel',
        travelerName: trip.travelerName || 'Unknown',
        tripType: trip.tripType || 'TOUR',
        tripStatus: 'CANCELLED',
        userId: trip.userId || 1
      };
      await tripService.updateTrip(trip.tripId, payload);
      setBookingsData(prev => prev.map(b => b.id === `TRP-${trip.tripId}` ? {...b, status: 'CANCELLED', raw: {...b.raw, tripStatus: 'CANCELLED'}} : b));
      if (selectedBooking && selectedBooking.id === `TRP-${trip.tripId}`) {
          setSelectedBooking(null);
      }
      alert("Booking cancelled successfully.");
    } catch (err) {
      console.error("Failed to cancel trip", err);
      let msg = "Failed to cancel booking.";
      if (err.response && err.response.data) {
          msg += " Server says: " + JSON.stringify(err.response.data);
      }
      alert(msg);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const tripList = await tripService.getTrips(0, 100);
        const formatTypeStr = (str) => {
          if (!str) return "Tour";
          return str.split(' + ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' + ');
        };

        const mappedBookings = (tripList.content || []).map(trip => {
          const actualType = formatTypeStr(trip.tripType);

          let paymentSt = "Pending";
          if (trip.bookings && trip.bookings.length > 0) {
              const latestBooking = trip.bookings[trip.bookings.length - 1];
              paymentSt = latestBooking.bookingStatus === 'CONFIRMED' || latestBooking.bookingStatus === 'COMPLETED' ? 'Paid' : 'Pending';
          } else {
              paymentSt = "Unpaid";
          }

          return {
            id: `TRP-${trip.tripId}`,
            customer: trip.travelerName || trip.userName || "Unknown User",
            type: actualType,
            destination: trip.destination || "Not Specified",
            date: trip.startDate ? new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : "TBD",
            amount: trip.budget ? `₹${trip.budget.toLocaleString()}` : "N/A",
            status: trip.tripStatus || "Pending",
            paymentStatus: paymentSt,
            raw: trip
          };
        });
        setBookingsData(mappedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
    
    // Set up real-time polling every 5 seconds
    const intervalId = setInterval(fetchBookings, 5000);
    
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredBookings = bookingsData.filter(bkg => {
    const matchesSearch = bkg.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || (bkg.status && bkg.status.toUpperCase() === statusFilter.toUpperCase());
    const matchesType = typeFilter === '' || (bkg.type && bkg.type.toUpperCase() === typeFilter.toUpperCase());
    const matchesPayment = paymentFilter === '' || (bkg.paymentStatus && bkg.paymentStatus.toUpperCase() === paymentFilter.toUpperCase());
    
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
  });

  const monthlyData = useMemo(() => {
    const counts = { Jan:0, Feb:0, Mar:0, Apr:0, May:0, Jun:0, Jul:0, Aug:0, Sep:0, Oct:0, Nov:0, Dec:0 };
    bookingsData.forEach(bkg => {
      if (bkg.raw.startDate) {
        const d = new Date(bkg.raw.startDate);
        const m = d.toLocaleString('en-US', { month: 'short' });
        if (counts[m] !== undefined) counts[m]++;
      }
    });
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months.map(m => ({ name: m, bookings: counts[m] }));
  }, [bookingsData]);

  const revenueByType = useMemo(() => {
    const formatTypeStr = (str) => {
      if (!str) return "Tour";
      return str.split(' + ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' + ');
    };
    
    const revenueMap = {};
    bookingsData.forEach(bkg => {
      const b = bkg.raw.budget || 0;
      const type = formatTypeStr(bkg.type);
      revenueMap[type] = (revenueMap[type] || 0) + b;
    });
    
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];
    let colorIndex = 0;
    
    const res = Object.keys(revenueMap).map(key => ({
      name: key,
      value: revenueMap[key],
      color: colors[colorIndex++ % colors.length]
    })).filter(item => item.value > 0);
    
    return res.length > 0 ? res : [{ name: 'No Data', value: 1, color: '#4B5563' }];
  }, [bookingsData]);

  const recentActivities = useMemo(() => {
    const sorted = [...bookingsData].sort((a, b) => b.raw.tripId - a.raw.tripId);
    return sorted.slice(0, 4).map((bkg, idx) => ({
      id: idx,
      action: "New Booking",
      details: `${bkg.customer} created a new ${bkg.type} booking to ${bkg.destination}.`,
      time: getRelativeTime(bkg.raw.createdAt)
    }));
  }, [bookingsData]);

  const stats = useMemo(() => {
    const total = bookingsData.length;
    const pending = bookingsData.filter(b => ['PENDING', 'PLANNED'].includes(b.status.toUpperCase())).length;
    const confirmed = bookingsData.filter(b => ['CONFIRMED', 'UPCOMING', 'ONGOING', 'COMPLETED'].includes(b.status.toUpperCase())).length;
    const cancelled = bookingsData.filter(b => b.status.toUpperCase() === 'CANCELLED').length;
    return { total, pending, confirmed, cancelled };
  }, [bookingsData]);

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
              <p>{isLoading ? '...' : stats.total}</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}><Calendar size={24}/></div>
            <div className="b-content">
              <h3>Pending</h3>
              <p>{isLoading ? '...' : stats.pending}</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}><CheckCircle size={24}/></div>
            <div className="b-content">
              <h3>Confirmed</h3>
              <p>{isLoading ? '...' : stats.confirmed}</p>
            </div>
          </div>
          <div className="booking-summary-card">
            <div className="b-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' }}><XCircle size={24}/></div>
            <div className="b-content">
              <h3>Cancelled</h3>
              <p>{isLoading ? '...' : stats.cancelled}</p>
            </div>
          </div>
        </div>

        {/* 2. ANALYTICS SECTION */}
        <div className="analytics-grid">
          <div className="chart-panel">
            <h2 className="chart-header">Bookings Per Month</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
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
                  <Pie data={revenueByType} cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="none" dataKey="value">
                    {revenueByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} contentStyle={{ background: '#171F2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </PieChart>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
                {revenueByType.map(type => (
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
            <option value="Planned">Planned</option>
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
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partial">Partial</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* 4. BOOKING TABLE */}
        <div className="table-container">
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
                      <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={() => setSelectedBooking(bkg)}
                          >
                            <Eye size={14} /> View
                          </button>
                          {bkg.status !== 'CONFIRMED' && bkg.status !== 'UPCOMING' && bkg.status !== 'CANCELLED' && (
                            <button 
                              className="btn-primary" 
                              style={{ padding: '6px 12px', fontSize: '12px', background: '#10B981', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                              onClick={() => handleConfirm(bkg.raw)}
                            >
                              <CheckCircle size={14} /> Confirm
                            </button>
                          )}
                        </div>
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
        </div>

        {/* 5. RECENT ACTIVITIES */}
        <div className="flex-between" style={{ marginTop: '40px', marginBottom: '20px' }}>
          <h2 style={{ color: 'white', fontSize: '20px' }}>Recent Booking Activities</h2>
        </div>
        <div className="glass-panel" style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.length > 0 ? recentActivities.map(act => (
              <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ color: 'white', fontSize: '15px', margin: '0 0 4px 0' }}>{act.action}</h4>
                  <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0 }}>{act.details}</p>
                </div>
                <span style={{ color: '#64748B', fontSize: '12px' }}>{act.time}</span>
              </div>
            )) : <p style={{ color: '#9CA3AF' }}>No recent activities found.</p>}
          </div>
        </div>

      </div>

      {/* RENDER MODAL IF A BOOKING IS SELECTED */}
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
          onConfirm={() => handleConfirm(selectedBooking.raw)}
          onCancel={() => handleCancel(selectedBooking.raw)}
        />
      )}
    </div>
  );
};

export default Bookings;
