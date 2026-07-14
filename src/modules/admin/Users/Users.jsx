import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import {
  Search,
  Mail,
  UserPlus,
  Download,
} from "lucide-react";
import "./Users.css";

const initialUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    joined: "12 Jan 2025",
    totalTrips: 4,
    totalSpent: "₹3,40,000",
    status: "Active",
  },
  {
    id: "USR-002",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Premium",
    joined: "05 Mar 2025",
    totalTrips: 7,
    totalSpent: "₹8,20,000",
    status: "Active",
  },
  {
    id: "USR-003",
    name: "Raj Kumar",
    email: "raj@example.com",
    role: "Customer",
    joined: "20 Jul 2024",
    totalTrips: 3,
    totalSpent: "₹2,10,000",
    status: "Inactive",
  },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "Customer",
    joined: "",
    totalTrips: 0,
    totalSpent: "",
    status: "Active",
  });

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      role === "All" ? true : user.role === role;

    return matchSearch && matchRole;
  });

  const deleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const addUser = () => {
    if (
      !newUser.id ||
      !newUser.name ||
      !newUser.email
    ) {
      alert("Please fill all required fields");
      return;
    }

    setUsers([...users, newUser]);

    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "Customer",
      joined: "",
      totalTrips: 0,
      totalSpent: "",
      status: "Active",
    });

    setShowForm(false);
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-wrapper users-wrapper">

        <div className="users-header">

          <div>
            <h2>User Management</h2>
            <p>
              Manage all registered customers of Travel Planner
            </p>
          </div>

          <div className="header-buttons">

            <button className="export-btn">
              <Download size={18} />
              Export
            </button>

            <button
              className="add-btn"
              onClick={() => setShowForm(true)}
            >
              <UserPlus size={18} />
              Add User
            </button>

          </div>

        </div>

        <div className="users-stats">

          <div className="stat-card">
            <h3>{users.length}</h3>
            <span>Total Users</span>
          </div>

          <div className="stat-card">
            <h3>
              {
                users.filter(
                  (u) => u.status === "Active"
                ).length
              }
            </h3>
            <span>Active Users</span>
          </div>

          <div className="stat-card">
            <h3>
              {
                users.filter(
                  (u) => u.role === "Premium"
                ).length
              }
            </h3>
            <span>Premium Users</span>
          </div>

        </div>

        <div className="toolbar">

          <div className="search-box">

            <Search size={18} />

            <input
              placeholder="Search user..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option>All</option>
            <option>Customer</option>
            <option>Premium</option>
          </select>

        </div>

        {showForm && (

          <div className="user-form">

            <input
              placeholder="User ID"
              value={newUser.id}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  id: e.target.value,
                })
              }
            />

            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                })
              }
            >
              <option>Customer</option>
              <option>Premium</option>
            </select>
                        <input
              placeholder="Joined Date"
              value={newUser.joined}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  joined: e.target.value,
                })
              }
            />

            <input
              placeholder="Total Trips"
              type="number"
              value={newUser.totalTrips}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  totalTrips: Number(e.target.value),
                })
              }
            />

            <input
              placeholder="Total Spent"
              value={newUser.totalSpent}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  totalSpent: e.target.value,
                })
              }
            />

            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  status: e.target.value,
                })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              className="save-btn"
              onClick={addUser}
            >
              Save User
            </button>

          </div>
        )}

        <div className="table-container">

          <table className="users-table">

            <thead>

              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Trips</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>

                    <div className="profile">

                      <div className="avatar">
                        {user.name.charAt(0)}
                      </div>

                      <div>

                        <h4>{user.name}</h4>

                        <p>
                          <Mail size={14} />
                          {user.email}
                        </p>

                        <small>{user.id}</small>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span
                      className={
                        user.role === "Premium"
                          ? "premium"
                          : "customer"
                      }
                    >
                      {user.role}
                    </span>

                  </td>

                  <td>{user.joined}</td>

                  <td>{user.totalTrips}</td>

                  <td>{user.totalSpent}</td>

                  <td>

                    <span
                      className={
                        user.status === "Active"
                          ? "active"
                          : "inactive"
                      }
                    >
                      {user.status}
                    </span>

                  </td>

                  <td>

                    <div className="actions">
                      <button className="view-btn">
                        <i className="bi bi-box-arrow-up-right"></i>
                        <span>View</span>
                      </button>

                      <button className="edit-btn">
                        <i className="bi bi-pencil-square"></i>
                        <span>Edit</span>
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteUser(user.id)}
                      >
                        <i className="bi bi-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>

                  </td>

                </tr>

              ))}

              {filteredUsers.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="no-data"
                  >
                    No users found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;