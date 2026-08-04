import React, { useEffect, useState } from "react";
import tripService from "../../../services/tripService";
import Navbar from "../../../components/Navbar/Navbar";
import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Eye,
  Trash2,
  Info,
} from "lucide-react";
import "./Trips.css";
import Pagination from "../Pagination/Pagination.jsx";
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
  //const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [showTripModal, setShowTripModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTrip, setCancelTrip] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const handleView = async (tripId) => {
    try {
      setLoadingUser(true);
      const view = await tripService.getTripById(tripId);
      console.log(view);
      const user = await tripService.getUserById(view.userId);
      console.log(user);

      const tripDetails = {
        ...view,
        ...user,
      };
      setSelectedTrip(tripDetails);
      setShowTripModal(true);
    } catch (err) {
      console.error(err);

      alert("Unable to load user.");
    } finally {
      setLoadingUser(false);
    }
  };

  const closeModal = () => {
    setShowTripModal(false);
    setSelectedTrip(null);
  };

  const handleCancelTrip = async (tripId) => {
    const tripData = trips.find((trip) => trip.tripId === tripId);

    if (tripData?.tripStatus === "CANCELLED") {
      return;
    }
    try {
      setLoadingUser(true);

      const trip = await tripService.getTripById(tripId);
      const user = await tripService.getUserById(trip.userId);

      setCancelTrip({
        ...trip,
        ...user,
      });

      setCancelReason("");
      setShowCancelModal(true);
    } catch (err) {
      console.error(err);
      alert("Unable to load trip details.");
    } finally {
      setLoadingUser(false);
    }
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelTrip(null);
    setCancelReason("");
  };

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

  const submitCancellation = async () => {
    if (!cancelReason.trim()) {
      alert("Please enter cancellation reason.");
      return;
    }
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      const request = {
        reason: cancelReason,
        cancelledByUserId: admin.userId,
        cancelledByRole: "ADMIN",
      };

      await tripService.cancelTrip(cancelTrip.tripId, request);

      alert("Trip cancelled successfully.");

      try {
        const emailRequest = {
          to: cancelTrip.email,
          subject: "Trip Cancellation",
          body:
            "<h2>Your trip has been cancelled.</h2>" +
            "<p><b>Destination:</b> " +
            cancelTrip.destination +
            "</p>" +
            "<p><b>Reason:</b> " +
            cancelReason +
            "</p>",
        };

        await tripService.sendEmail(emailRequest);
      } catch (err) {
        console.error(err);
      }

      closeCancelModal();

      loadTrips();
    } catch (err) {
      console.error(err);

      alert("Unable to cancel trip.");
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.tripId.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "" || trip.tripStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredTrips.length / rowsPerPage);

  const indexOfLastTrip = currentPage * rowsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - rowsPerPage;

  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  // Pagination.Pagination(filteredTrips);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);
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
                ) : currentTrips.length > 0 ? (
                  currentTrips.map((trip) => (
                    <tr key={trip.tripId}>
                      <td>
                        <span className="trip-id">{trip.tripId}</span>
                      </td>

                      <td>
                        <div
                          className="user-cell"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            className="avatar"
                            style={{
                              background:
                                "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                              width: "32px",
                              height: "32px",
                              minWidth: "32px",
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              color: "white",
                              fontWeight: "bold",
                              flexShrink: 0,
                            }}
                          >
                            {trip.userName?.charAt(0)}
                          </div>

                          <div className="fw-500">{trip.userName}</div>
                        </div>
                      </td>

                      <td className="fw-500 text-white">{trip.destination}</td>

                      <td className="text-muted">
                        {trip.startDate} - {trip.endDate}
                      </td>

                      <td>{getStatusBadge(trip.tripStatus)}</td>

                      <td className="text-white">
                        ₹{Number(trip.budget).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <div className="actions">
                          <button
                            className="view-btn"
                            onClick={() => handleView(trip.tripId)}
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                            <span>View</span>
                          </button>

                          <button
                            className={`cancel-trip ${
                              trip.tripStatus === "CANCELLED"
                                ? "disabled-btn"
                                : ""
                            }`}
                            disabled={trip.tripStatus === "CANCELLED"}
                            onClick={() => handleCancelTrip(trip.tripId)}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <i
                              className={`bi ${
                                trip.tripStatus === "CANCELLED"
                                  ? "bi-check-circle-fill"
                                  : "bi-x-circle-fill"
                              }`}
                            ></i>

                            <span>
                              {trip.tripStatus === "CANCELLED"
                                ? "Cancelled"
                                : "Cancel Trip"}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {!loading && filteredTrips.length === 0 && (
              <div className="empty-state">
                <p>No trips found matching your search.</p>
              </div>
            )}
          </div>

          <Pagination
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            indexOfLastModule={indexOfLastTrip}
            indexOfFirstModule={indexOfFirstTrip}
            currentModules={currentTrips}
            filteredModules={filteredTrips}
          />
          {/* <div className="pagination">
          <span className="text-muted">
            Showing {filteredTrips.length} of {trips.length} entries
          </span>

          <div className="page-buttons">
            <button className="page-btn disabled">Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">Next</button>
          </div>
        </div> */}
        </div>

        {showTripModal && selectedTrip && (
          <div className="trip-modal-overlay">
            <div className="trip-modal">
              <div className="trip-modal-header">
                <h2>Trip Details</h2>
                <button className="close-btn" onClick={closeModal}>
                  ✕
                </button>
              </div>
              <div className="trip-modal-body">
                <div className="trip-details-grid">
                  <div className="detail-item">
                    <label>Title</label>
                    <p>{selectedTrip.title}</p>
                  </div>
                  <div className="detail-item">
                    <label>Destination</label>
                    <p>{selectedTrip.destination}</p>
                  </div>
                  <div className="detail-item full-width">
                    <label>Description</label>
                    <p>{selectedTrip.description}</p>
                  </div>
                  <div className="detail-item">
                    <label>Source</label>
                    <p>{selectedTrip.source}</p>
                  </div>
                  <div className="detail-item">
                    <label>Destination</label>
                    <p>{selectedTrip.destination}</p>
                  </div>
                  <div className="detail-item">
                    <label>Start Date</label>
                    <p>{selectedTrip.startDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>End Date</label>
                    <p>{selectedTrip.endDate}</p>
                  </div>
                  <div className="detail-item">
                    <label>Budget</label>
                    <p>₹{Number(selectedTrip.budget).toLocaleString()}</p>
                  </div>
                  <div className="detail-item">
                    <label>Status</label>
                    <p>{selectedTrip.tripStatus}</p>
                  </div>
                  {selectedTrip.tripStatus === "CANCELLED" && (
                    <>
                      <div className="detail-item full-width">
                        <label>Cancellation Reason</label>
                        <p>{selectedTrip.cancellationReason}</p>
                      </div>

                      <div className="detail-item">
                        <label>Cancelled By</label>
                        <p>{selectedTrip.cancelledByRole}</p>
                      </div>

                      <div className="detail-item">
                        <label>Cancelled At</label>
                        <p>{selectedTrip.cancelledAt}</p>
                      </div>
                    </>
                  )}
                  <div className="detail-item">
                    <label>Created At</label>
                    <p>{selectedTrip.createdAt}</p>
                  </div>
                  <div className="detail-item">
                    <label>Updated At</label>
                    <p>{selectedTrip.updatedAt}</p>
                  </div>
                </div>

                <h3 className="section-title">User Information</h3>
                <div className="trip-details-grid">
                  <div className="detail-item">
                    <label>User ID</label>
                    <p>{selectedTrip.userId}</p>
                  </div>
                  <div className="detail-item">
                    <label>First Name</label>
                    <p>{selectedTrip.firstName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Last Name</label>
                    <p>{selectedTrip.lastName}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{selectedTrip.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Mobile Number</label>
                    <p>{selectedTrip.mobileNumber}</p>
                  </div>
                  <div className="detail-item">
                    <label>Role</label>
                    <p>{selectedTrip.roleName}</p>
                  </div>
                </div>
              </div>
              <div className="trip-modal-footer">
                <button className="close-modal-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showCancelModal && cancelTrip && (
          <div className="trip-modal-overlay">
            <div className="cancel-modal">
              <div className="trip-modal-header">
                <h2>Cancel Trip</h2>
                <button className="close-btn" onClick={closeCancelModal}>
                  ✕
                </button>
              </div>
              <div className="trip-modal-body">
                <div className="cancel-grid">
                  <div className="detail-item">
                    <label>First Name</label>
                    <input type="text" value={cancelTrip.firstName} readOnly />
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <input type="text" value={cancelTrip.email} readOnly />
                  </div>
                  <div className="detail-item">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      value={cancelTrip.mobileNumber}
                      readOnly
                    />
                  </div>
                  <div className="detail-item">
                    <label>Destination</label>
                    <input
                      type="text"
                      value={cancelTrip.destination}
                      readOnly
                    />
                  </div>
                  <div className="detail-item full-width">
                    <label>Cancellation Reason</label>
                    <textarea
                      rows="6"
                      placeholder="Enter cancellation reason..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="trip-modal-footer">
                <button
                  className="close-modal-btn"
                  onClick={closeCancelModal}
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Close
                </button>
                <button
                  className="confirm-cancel-btn"
                  onClick={submitCancellation}
                  style={{
                    background: "#EF4444",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Trips;
