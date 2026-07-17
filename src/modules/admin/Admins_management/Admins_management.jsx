import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./Admins_management.css";
function AdminsManagement() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const emptyAdmin = {
    name: "",
    email: "",
    username: "",
    password: "",
    role: "Admin",
    status: "Active",
  };
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Aravind",
      email: "admin@travelplanner.com",
      username: "admin",
      password: "123456",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "John David",
      email: "john@travelplanner.com",
      username: "johnadmin",
      password: "123456",
      role: "Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@travelplanner.com",
      username: "sarahadmin",
      password: "123456",
      role: "Admin",
      status: "Inactive",
    },
  ]);
  const [newAdmin, setNewAdmin] = useState(emptyAdmin);
 // Search Filter
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase()) ||
    admin.username.toLowerCase().includes(search.toLowerCase())
  );
  // Create / Update Admin
  const saveAdmin = () => {
    if (
      !newAdmin.name ||
      !newAdmin.email ||
      !newAdmin.username ||
      !newAdmin.password
    ) {
      alert("Please fill all fields");
      return;
    }
    if(editId !== null){
      setAdmins(
        admins.map((admin)=>
          admin.id === editId
          ? {
              ...admin,
              ...newAdmin
            }
          : admin
        )
      );
    }
    else{

      setAdmins([
        ...admins,
        {
              id: admins.length + 1,
          ...newAdmin
        }
      ]);

    }
    setNewAdmin(emptyAdmin);
    setEditId(null);
    setShowAdminForm(false);
  };
  // Edit Admin
  const editAdmin = (admin)=>{
    setNewAdmin({
      name: admin.name,
      email: admin.email,
      username: admin.username,
      password: admin.password,
      role: admin.role,
      status: admin.status
    });
    setEditId(admin.id);
    setShowAdminForm(true);
  };
  // Delete Admin
  const deleteAdmin=(id)=>{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Admin?"
    );
    if(confirmDelete){
      setAdmins(
        admins.filter(
          (admin)=>admin.id !== id
        )
      );
    }
  };
  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-wrapper admin-wrapper">
        {/* HEADER */}
        <div className="admin-header">
          <div>
            <h1>
              Admin Management
            </h1>
            <p>
              Create, Edit and Manage Portal Administrators
            </p>
          </div>
          <button
            className="create-btn"
            onClick={()=>{
              setShowAdminForm(true);
              setEditId(null);
              setNewAdmin(emptyAdmin);
            }}
          >
            + Create Admin
          </button>
        </div>
        {/* SEARCH */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Admin..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        {/* FORM */}
        {
          showAdminForm && (
          <div className="admin-form">
            <h2>
              {
                editId
                ? "Update Admin"
                : "Create New Admin"
              }
            </h2>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Full Name"
                value={newAdmin.name}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    name:e.target.value
                  })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    email:e.target.value
                  })
                }
              />
              <input
                type="text"
                placeholder="Username"
                value={newAdmin.username}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    username:e.target.value
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    password:e.target.value
                  })
                }
              />
              <select
                value={newAdmin.role}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    role:e.target.value
                  })
                }
              >
                <option value="Admin">
                  Admin
                </option>
              </select>
              <select
                value={newAdmin.status}
                onChange={(e)=>
                  setNewAdmin({
                    ...newAdmin,
                    status:e.target.value
                  })
                }
              >
                <option value="Active">
                  Active
                </option>
                <option value="Inactive">
                  Inactive
                </option>

              </select>
            </div>
            <div className="form-buttons">
              <button
                className="save-btn"
                onClick={saveAdmin}
              >
                {
                  editId
                  ? "Update Admin"
                  : "Create Admin"
                }

              </button>
              <button
                className="cancel-btn"
                onClick={()=>{

                  setShowAdminForm(false);
                  setEditId(null);

                }}
              >
                Cancel
              </button>
            </div>
          </div>
          )
        }
        {/* TABLE */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              filteredAdmins.map((admin)=>(
              <tr key={admin.id}>
                <td>
                  {admin.id}
                </td>
                <td>
                  {admin.name}
                </td>
                <td>
                  {admin.email}
                </td>
                <td>
                  {admin.username}
                </td>
                <td>
                  <span className="role-admin">
                    {admin.role}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      admin.status==="Active"
                      ? "status-active"
                      : "status-inactive"
                    }
                  >
                    {admin.status}
                  </span>
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={()=>editAdmin(admin)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={()=>deleteAdmin(admin.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              ))
            }
            {
              filteredAdmins.length===0 && (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign:"center",
                      padding:"30px"
                    }}
                  >
                    No Admins Found
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminsManagement;