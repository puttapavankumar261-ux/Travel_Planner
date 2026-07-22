import React, { useEffect, useState } from "react";
import tripService from "../../../services/tripService";
import Navbar from "../../../components/Navbar/Navbar";
import { Search, Filter, MoreVertical, Edit2, Eye, Trash2 } from "lucide-react";
import "./Trips.css";
const getStatusBadge = (status) => {
  switch (status) {
    case "PLANNED":
      return <span className="badge badge-warning">Planned</span>;

    case "UPCOMING":
      return <span className="badge badge-primary">Upcoming</span>;

    case "ONGOING":
      return <span className="badge badge-success">Ongoing</span>;

    case "COMPLETED":
      return <span className="badge badge-secondary">Completed</span>;

    case "CANCELLED":
      return <span className="badge badge-danger">Cancelled</span>;

    default:
      return <span className="badge">{status}</span>;
  }
};

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadTrips = async () => {
    try {
      setLoading(true);

      const data = await tripService.getTrips();

      setTrips(data.content);
    } catch (error) {
      console.error("Failed to load trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripId.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "" || trip.tripStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
  <div className="dashboard-page">
    <Navbar />

    <div className="dashboard-wrapper trips-wrapper">
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              color: "white",
              fontSize: "28px",
              marginBottom: "8px",
            }}
          >
            All User Trips
          </h1>
          <p style={{ color: "#9CA3AF" }}>
            Manage and monitor all itineraries created across the platform.
          </p>
        </div>

        <button
          className="btn-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
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
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="PLANNED">Planned</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
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
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => (
                  <tr key={trip.tripId}>
                    <td>
                      <span className="trip-id">
                        TRP-{trip.tripId}
                      </span>
                    </td>

                    <td>
                      <div className="user-cell">
                        <div
                          className="avatar"
                          style={{
                            background:
                              "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                          }}
                        >
                          {trip.userName?.charAt(0)}
                        </div>

                        <div className="fw-500">
                          {trip.userName}
                        </div>
                      </div>
                    </td>

                    <td className="fw-500 text-white">
                      {trip.destination}
                    </td>

                    <td className="text-muted">
                      {trip.startDate} - {trip.endDate}
                    </td>

                    <td>{getStatusBadge(trip.tripStatus)}</td>

                    <td className="text-white">
                      ₹{Number(trip.budget).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="icon-btn-small"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          className="icon-btn-small"
                          title="Edit Trip"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          className="icon-btn-small danger"
                          title="Delete Trip"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && filteredTrips.length === 0 && (
            <div className="empty-state">
              <p>No trips found matching your search.</p>
            </div>
          )}
        </div>

        <div className="pagination">
          <span className="text-muted">
            Showing {filteredTrips.length} of {trips.length} entries
          </span>

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
}
export default Trips