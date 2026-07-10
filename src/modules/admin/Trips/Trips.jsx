import React, { useState } from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import { Search, Filter, MoreVertical, Edit2, Eye, Trash2 } from "lucide-react";
import "./Trips.css";

const MOCK_TRIPS = [
  {
    id: "TRP-1001",
    user: "John Doe",
    userEmail: "john@example.com",
    destination: "Tokyo, Japan",
    dates: "Oct 12 - Oct 20, 2026",
    status: "Upcoming",
    budget: "₹1,20,000",
    travelers: 2,
    created: "2026-06-15"
  },
  {
    id: "TRP-1002",
    user: "Sarah Smith",
    userEmail: "sarah@example.com",
    destination: "Paris, France",
    dates: "Nov 05 - Nov 15, 2026",
    status: "Planning",
    budget: "₹2,50,000",
    travelers: 1,
    created: "2026-07-02"
  },
  {
    id: "TRP-1003",
    user: "Raj Kumar",
    userEmail: "raj@example.com",
    destination: "Bali, Indonesia",
    dates: "Aug 10 - Aug 18, 2026",
    status: "Active",
    budget: "₹85,000",
    travelers: 4,
    created: "2026-05-20"
  },
  {
    id: "TRP-1004",
    user: "Emily Chen",
    userEmail: "emily@example.com",
    destination: "New York, USA",
    dates: "Dec 20 - Jan 02, 2027",
    status: "Upcoming",
    budget: "₹3,00,000",
    travelers: 2,
    created: "2026-07-05"
  },
  {
    id: "TRP-1005",
    user: "Michael Brown",
    userEmail: "michael@example.com",
    destination: "Swiss Alps",
    dates: "Feb 10 - Feb 20, 2027",
    status: "Planning",
    budget: "₹4,50,000",
    travelers: 3,
    created: "2026-07-08"
  },
  {
    id: "TRP-1006",
    user: "Anita Desai",
    userEmail: "anita@example.com",
    destination: "Goa, India",
    dates: "Sep 05 - Sep 10, 2026",
    status: "Upcoming",
    budget: "₹45,000",
    travelers: 5,
    created: "2026-07-01"
  }
];

const getStatusBadge = (status) => {
  switch(status) {
    case 'Upcoming':
      return <span className="badge badge-primary">{status}</span>;
    case 'Active':
      return <span className="badge badge-success">{status}</span>;
    case 'Planning':
      return <span className="badge badge-warning">{status}</span>;
    default:
      return <span className="badge">{status}</span>;
  }
};

const Trips = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTrips = MOCK_TRIPS.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trip.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-wrapper trips-wrapper">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '28px', marginBottom: '8px' }}>All User Trips</h1>
            <p style={{ color: '#9CA3AF' }}>Manage and monitor all itineraries created across the platform.</p>
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            <Filter size={18} /> Export Data
          </button>
        </div>

        <div className="trips-glass-container glass-panel">
          <div className="table-controls">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search by ID, User, or Destination..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Trip ID</th>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Travel Dates</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map(trip => (
                  <tr key={trip.id}>
                    <td>
                      <span className="trip-id">{trip.id}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)' }}>
                          {trip.user.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-500">{trip.user}</div>
                          <div className="text-muted text-sm">{trip.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="fw-500 text-white">{trip.destination}</td>
                    <td className="text-muted">{trip.dates}</td>
                    <td>{getStatusBadge(trip.status)}</td>
                    <td className="text-white">{trip.budget}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="icon-btn-small" title="Edit Trip">
                          <Edit2 size={18} />
                        </button>
                        <button className="icon-btn-small danger" title="Delete Trip">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTrips.length === 0 && (
              <div className="empty-state">
                <p>No trips found matching your search.</p>
              </div>
            )}
          </div>
          
          <div className="pagination">
            <span className="text-muted">Showing {filteredTrips.length} of {MOCK_TRIPS.length} entries</span>
            <div className="page-buttons">
              <button className="page-btn disabled">Prev</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trips;
