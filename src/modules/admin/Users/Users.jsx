import React, { useState } from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import { Search, Filter, Mail, Edit2, Trash2, ExternalLink } from "lucide-react";
import "./Users.css";

const MOCK_USERS = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    joined: "Jan 12, 2025",
    totalTrips: 4,
    totalSpent: "₹3,40,000",
    status: "Active"
  },
  {
    id: "USR-002",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Customer",
    joined: "Mar 05, 2025",
    totalTrips: 1,
    totalSpent: "₹1,20,000",
    status: "Active"
  },
  {
    id: "USR-003",
    name: "Raj Kumar",
    email: "raj@example.com",
    role: "Premium",
    joined: "May 20, 2024",
    totalTrips: 8,
    totalSpent: "₹9,50,000",
    status: "Active"
  },
  {
    id: "USR-004",
    name: "Emily Chen",
    email: "emily@example.com",
    role: "Customer",
    joined: "Dec 02, 2025",
    totalTrips: 2,
    totalSpent: "₹2,10,000",
    status: "Inactive"
  },
  {
    id: "USR-005",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Customer",
    joined: "Feb 18, 2026",
    totalTrips: 3,
    totalSpent: "₹4,00,000",
    status: "Active"
  }
];

const getStatusBadge = (status) => {
  if (status === 'Active') return <span className="badge badge-success">Active</span>;
  return <span className="badge badge-secondary">Inactive</span>;
};

const getRoleBadge = (role) => {
  if (role === 'Premium') return <span className="badge badge-warning">Premium</span>;
  return <span className="badge badge-primary">Customer</span>;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="dashboard-wrapper users-wrapper">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '28px', marginBottom: '8px' }}>User Management</h1>
            <p style={{ color: '#9CA3AF' }}>Monitor customers, their spending, and travel history.</p>
          </div>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            <Filter size={18} /> Export CSV
          </button>
        </div>

        <div className="glass-panel">
          <div className="table-controls">
            <div className="search-bar">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search by Name, Email, or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <select className="filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">All Roles</option>
                <option value="Customer">Customer</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Customer Profile</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Total Trips</th>
                  <th>Total Spent</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <span className="trip-id">{user.id}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="avatar" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-500">{user.name}</div>
                          <div className="text-muted text-sm" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td className="text-muted">{user.joined}</td>
                    <td className="fw-500 text-white">{user.totalTrips} Trips</td>
                    <td className="fw-500 text-success">{user.totalSpent}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn-small" title="View Profile">
                          <ExternalLink size={18} />
                        </button>
                        <button className="icon-btn-small" title="Edit User">
                          <Edit2 size={18} />
                        </button>
                        <button className="icon-btn-small danger" title="Suspend User">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="empty-state">
                <p>No users found matching your search.</p>
              </div>
            )}
          </div>
          
          <div className="pagination">
            <span className="text-muted">Showing {filteredUsers.length} of {MOCK_USERS.length} users</span>
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

export default Users;
