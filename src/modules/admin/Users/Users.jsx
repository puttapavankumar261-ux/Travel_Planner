import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import userService from "../../../services/userService";
import Navbar from "../../../components/Navbar/Navbar";

import {
  Search,
  Mail,
  UserPlus,
  Download,
  MoreVertical,
  Edit2,
  Eye,
  Trash2,
} from "lucide-react";

import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  // Pagination
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const [newUser, setNewUser] = useState({
    loginProvider: "LOCAL",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "MALE",
    country: "",
    preferredLanguage: "English",
    preferredCurrency: "INR",
    roleId: 2,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await userService.getUsers();

      setUsers(data);
    } catch (error) {
      console.error("Failed to load Users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Reset page when search or role changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, role]);

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.userId?.toString().includes(search);

    const matchRole = role === "All" ? true : user.roleName === role;

    return matchSearch && matchRole;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Page change
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const handleView = async (id) => {
    try {
      setLoadingUser(true);
      const view = await userService.getUserById(id);
      console.log(view);

      setSelectedUser(view);

      setShowViewModal(true);
    } catch (err) {
      console.error(err);

      alert("Unable to load user.");
    } finally {
      setLoadingUser(false);
    }
  };
  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-wrapper users-wrapper">
        <div className="users-header">
          <div>
            <h2>User Management</h2>
            <p>Manage all registered customers of Travel Planner</p>
          </div>
        </div>

        <div className="users-stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <span>Total Users</span>
          </div>

          <div className="stat-card">
            <h3>{users.filter((user) => user.roleName === "ADMIN").length}</h3>
            <span>Admin Users</span>
          </div>

          <div className="stat-card">
            <h3>{users.filter((user) => user.roleName === "USER").length}</h3>
            <span>Customer Users</span>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />

            <input
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>country</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Loading users...
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  // {filteredUsers.map((user) => (

                  <tr key={user.UserId}>
                    <td>
                      <span className="user-id">{user.userId}</span>
                    </td>
                    <td>
                      <span className="user-details">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </td>
                    <td>
                      <span className="user-details">{user.email}</span>
                    </td>
                    <td>
                      <span className="user-details">{user.gender}</span>
                    </td>
                    <td>
                      <span className="user-details">{user.mobileNumber}</span>
                    </td>
                    <td>
                      <span className="user-details">{user.country}</span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="view-btn"
                          onClick={() => handleView(user.userId)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>View</span>
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
        </div>

        {/* Pagination */}

        <div className="pagination">
          <span className="text-muted">
            Showing {filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1}
            {" - "}
            {Math.min(indexOfLastUser, filteredUsers.length)}
            {" of "}
            {filteredUsers.length}
            {" entries"}
          </span>

          <div className="page-buttons">
            {/* Prev */}

            <button
              className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </button>

            {/* Page Numbers */}

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next */}

            <button
              className={`page-btn ${
                currentPage === totalPages || totalPages === 0 ? "disabled" : ""
              }`}
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {showViewModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowViewModal(false)}
          >
            <div
              className="view-user-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>User Details</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowViewModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="detail-row">
                  <span>First Name</span>
                  <p>{selectedUser?.firstName}</p>
                </div>

                <div className="detail-row">
                  <span>Last Name</span>
                  <p>{selectedUser?.lastName}</p>
                </div>

                <div className="detail-row">
                  <span>Email</span>
                  <p>{selectedUser?.email}</p>
                </div>

                <div className="detail-row">
                  <span>Mobile Number</span>
                  <p>{selectedUser?.mobileNumber}</p>
                </div>

                <div className="detail-row">
                  <span>Gender</span>
                  <p>{selectedUser?.gender}</p>
                </div>

                <div className="detail-row">
                  <span>Date of Birth</span>
                  <p>{selectedUser?.dateOfBirth}</p>
                </div>

                <div className="detail-row">
                  <span>Country</span>
                  <p>{selectedUser?.country}</p>
                </div>

                <div className="detail-row">
                  <span>Preferred Language</span>
                  <p>{selectedUser?.preferredLanguage}</p>
                </div>

                <div className="detail-row">
                  <span>Preferred Currency</span>
                  <p>{selectedUser?.preferredCurrency}</p>
                </div>

                <div className="detail-row">
                  <span>Role</span>
                  <p>{selectedUser?.roleName}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="close-modal-btn"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
