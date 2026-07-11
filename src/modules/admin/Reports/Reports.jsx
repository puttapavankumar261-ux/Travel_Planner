import React, { useState } from 'react';
import Navbar from "../../../components/Navbar/Navbar";
import './Reports.css';

// Mock Data
const MOCK_REPORTS = [
  {
    id: "TRP-2026-001",
    user: "John Doe",
    email: "john@example.com",
    destination: "Paris, France",
    transport: "Flight",
    date: "2026-07-15",
    amount: "₹1,20,000",
    status: "Paid",
    paymentDetails: {
      type: "Credit Card",
      date: "2026-07-10",
      time: "14:30 IST",
      id: "TXN-99882233"
    },
    activities: "Eiffel Tower, Louvre"
  },
  {
    id: "TRP-2026-002",
    user: "Aisha Khan",
    email: "aisha@example.com",
    destination: "Goa, India",
    transport: "Train",
    date: "2026-08-02",
    amount: "₹15,000",
    status: "Pending",
    paymentDetails: {
      type: "UPI",
      date: "Pending",
      time: "Pending",
      id: "Pending"
    },
    activities: "Scuba Diving, Beach Hopping"
  },
  {
    id: "TRP-2026-003",
    user: "Michael Smith",
    email: "mike@example.com",
    destination: "Kyoto, Japan",
    transport: "Flight",
    date: "2026-09-10",
    amount: "₹2,50,000",
    status: "Paid",
    paymentDetails: {
      type: "Net Banking",
      date: "2026-07-09",
      time: "09:15 IST",
      id: "TXN-77441122"
    },
    activities: "Temple Tour, Tea Ceremony"
  },
  {
    id: "TRP-2026-004",
    user: "Priya Sharma",
    email: "priya@example.com",
    destination: "Manali, India",
    transport: "Bus",
    date: "2026-07-20",
    amount: "₹12,500",
    status: "Failed",
    paymentDetails: {
      type: "Debit Card",
      date: "2026-07-08",
      time: "18:45 IST",
      id: "TXN-FAILED-001"
    },
    activities: "Trekking, Camping"
  }
];

const Reports = () => {
  const [dateFilter, setDateFilter] = useState('Last 7 Days');
  const [reportType, setReportType] = useState('Revenue');
  const [bookingType, setBookingType] = useState('All');

  const handleExport = () => {
    alert("Exporting report as CSV...");
  };

  return (
    <div className="reports-container">
  <div className="dashboard-page">
    <Navbar />

    <div className="dashboard-wrapper reports-wrapper">
      <div className="reports-container">
      <div className="admin-header">
        <h1>Reports & Analytics</h1>
        <p>Analyze revenue, bookings, and user activity</p>
      </div>

      {/* Filters */}
      <div className="reports-filters">
        <div className="filter-group">
          <label>Date Range</label>
          <select 
            className="filter-select" 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last Month">Last Month</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Report Type</label>
          <select 
            className="filter-select" 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Revenue">Revenue</option>
            <option value="Bookings">Bookings</option>
            <option value="Users">Users</option>
            <option value="Destinations">Destinations</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Booking Type</label>
          <select 
            className="filter-select" 
            value={bookingType} 
            onChange={(e) => setBookingType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
          </select>
        </div>

        <button className="export-btn" onClick={handleExport}>
          <i className="bi bi-download"></i> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="reports-stats-grid">
        <div className="report-stat-card">
          <h3><i className="bi bi-graph-up-arrow" style={{color: '#10B981'}}></i> Top Performing Services</h3>
          <div className="stat-item">
            <span className="label">International Flights</span>
            <span className="value">₹12,50,000</span>
          </div>
          <div className="stat-item">
            <span className="label">Luxury Hotels</span>
            <span className="value">₹8,40,000</span>
          </div>
          <div className="stat-item">
            <span className="label">Guided Tours</span>
            <span className="value">₹3,20,000</span>
          </div>
        </div>

        <div className="report-stat-card">
          <h3><i className="bi bi-car-front" style={{color: '#3B82F6'}}></i> Most Used Transport Type</h3>
          <div className="stat-item">
            <span className="label">Flight</span>
            <span className="value">65% (450 bookings)</span>
          </div>
          <div className="stat-item">
            <span className="label">Train</span>
            <span className="value">20% (140 bookings)</span>
          </div>
          <div className="stat-item">
            <span className="label">Bus & Car</span>
            <span className="value">15% (105 bookings)</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="report-table-section">
        <h3>{reportType} Report ({dateFilter})</h3>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>User Info</th>
                <th>Destination</th>
                <th>Transport</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REPORTS.map((report, index) => (
                <tr key={index}>
                  <td style={{fontWeight: '500', color: '#60A5FA'}}>{report.id}</td>
                  <td>
                    <div style={{color: 'white'}}>{report.user}</div>
                    <div style={{fontSize: '12px', color: '#9CA3AF'}}>{report.email}</div>
                  </td>
                  <td>
                    <div style={{color: 'white'}}>{report.destination}</div>
                    <div style={{fontSize: '12px', color: '#9CA3AF'}}>{report.date}</div>
                  </td>
                  <td>{report.transport}</td>
                  <td style={{color: 'white', fontWeight: '500'}}>{report.amount}</td>
                  <td>
                    {/* Hover Interaction Tooltip */}
                    <div className="tooltip-container">
                      <span className={`status-badge status-${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                      
                      <div className="tooltip-content">
                        <div style={{color: 'white', marginBottom: '10px', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px'}}>
                          Payment Details
                        </div>
                        <div className="tooltip-row">
                          <span>Method:</span>
                          <span>{report.paymentDetails.type}</span>
                        </div>
                        <div className="tooltip-row">
                          <span>Date:</span>
                          <span>{report.paymentDetails.date}</span>
                        </div>
                        <div className="tooltip-row">
                          <span>Time:</span>
                          <span>{report.paymentDetails.time}</span>
                        </div>
                        <div className="tooltip-row">
                          <span>Txn ID:</span>
                          <span>{report.paymentDetails.id}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize: '13px'}}>{report.activities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

          </div>
    </div>
  </div>
);
};
export default Reports;
