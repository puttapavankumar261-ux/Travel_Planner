import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import "./Admins.css";
import userService from "../../../services/userService";
import Pagination from "../Pagination/Pagination.jsx";

function Admins() {  
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const formRef = useRef(null);

  // Pagination
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const emptyAdmin = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    preferredLanguage: "English",
    preferredCurrency: "INR",
    roleId: 1
  };

  const [newAdmin, setNewAdmin] = useState(emptyAdmin);

    const loadAdmins = async () => {
      try {
        setLoading(true);
        //const data = await userService.getUsers();
        const user = await userService.getUsers();
        //console.log(user);
        const adminUsers = user.filter(user => user.roleName === 'ADMIN');
        setAdmins(adminUsers);
      } catch (error) {
        console.error("Failed to load Users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadAdmins();
    }, []);
  
    // Reset page when search or role changes
    useEffect(() => {
      setCurrentPage(1);
    }, [search, role]);


 // Search Filter
  const filteredAdmins = admins.filter((admin) => {
   
    const matchSearch =
    admin.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    admin.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    admin.email?.toLowerCase().includes(search.toLowerCase()) ||
    admin.userId?.toString().includes(search);

    const matchRole = role === "All" ? true : admin.roleName === role;

    return matchSearch && matchRole;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;

  const currentUsers = filteredAdmins.slice(indexOfFirstUser, indexOfLastUser);
 

  const saveAdmin = async () => {

    if (
        !newAdmin.firstName ||
        !newAdmin.lastName ||
        !newAdmin.email ||
        !newAdmin.password
    ) {
        alert("Please fill all required fields.");
        return;
    }

    try {

        const payload = {
            ...newAdmin,
            roleId: 1
        };

        const res = await userService.createUser(payload);
         console.log(res);

        alert("Admin created successfully.");

        setShowAdminForm(false);
        setNewAdmin(emptyAdmin);

        loadAdmins();

    } catch (error) {

        console.error(error);

        alert("Unable to create Admin.");

    }

};

  const handleAdmin = async (id) => {
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
 
  // Delete Admin
  const deleteAdmin = async () => {

    if (!adminToDelete) return;

    try {

        setDeleting(true);

        await userService.deleteUser(adminToDelete.userId);

        setAdmins(prev =>
            prev.filter(a => a.userId !== adminToDelete.userId)
        );

        alert(
            `${adminToDelete.firstName} ${adminToDelete.lastName} has been deleted successfully.`
        );

        setShowDeleteModal(false);
        setAdminToDelete(null);

    } catch (error) {

        console.error(error);

        alert("Unable to delete admin.");

    } finally {

        setDeleting(false);

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
            
              onClick={() => {
                      setShowAdminForm(true);
                      setNewAdmin(emptyAdmin);

                      setTimeout(() => {
                          formRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                          });
                      }, 100);
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
                <h2>Admin Details</h2>
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

        {showAdminForm && (

          <div className="adminadd-form" ref={formRef}>

    <div className="form-header">
        <h2>Create New Admin</h2>
        <p>Fill in the administrator details below.</p>
    </div>

    <div className="form-grid">

        <div className="form-group">
            <label>First Name</label>
            <input
                type="text"
                placeholder="Enter first name"
                value={newAdmin.firstName}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        firstName: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Last Name</label>
            <input
                type="text"
                placeholder="Enter last name"
                value={newAdmin.lastName}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        lastName: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                placeholder="Enter email"
                value={newAdmin.email}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        email: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                placeholder="Enter password"
                value={newAdmin.password}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        password: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Mobile Number</label>
            <input
                type="text"
                placeholder="Enter mobile number"
                value={newAdmin.mobileNumber}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        mobileNumber: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Gender</label>
            <select
                value={newAdmin.gender}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        gender: e.target.value
                    })
                }
            >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
            </select>
        </div>

        <div className="form-group">
            <label>Date of Birth</label>
            <input
                type="date"
                value={newAdmin.dateOfBirth}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        dateOfBirth: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Country</label>
            <input
                type="text"
                placeholder="Enter country"
                value={newAdmin.country}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        country: e.target.value
                    })
                }
            />
        </div>

        <div className="form-group">
            <label>Preferred Language</label>
            <select
                value={newAdmin.preferredLanguage}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        preferredLanguage: e.target.value
                    })
                }
            >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Kannada">Kannada</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
            </select>
        </div>

        <div className="form-group">
            <label>Preferred Currency</label>
            <input
                type="text"
                placeholder="Enter Preferred Currency"
                value={newAdmin.preferredCurrency}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        preferredCurrency: e.target.value
                    })
                }
            />
        </div>

        {/* <div className="form-group">
            <label>Preferred Currency</label>
            <select
                value={newAdmin.preferredCurrency}
                onChange={(e) =>
                    setNewAdmin({
                        ...newAdmin,
                        preferredCurrency: e.target.value
                    })
                }
            >
                <option value="">Select Currency</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
        </div> */}

    </div>

    <div className="form-buttons">
        <button
            className="save-btn"
            onClick={saveAdmin}
        >
            Create Admin
        </button>

        <button
            className="cancel-btn"
            onClick={() => {
                setShowAdminForm(false);
                setNewAdmin(emptyAdmin);
            }}
        >
            Cancel
        </button>
    </div>

</div>
  )}

  {
showDeleteModal && (

<div
    className="modal-overlay"
    onClick={() => !deleting && setShowDeleteModal(false)}
>

    <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
    >

        <div className="delete-icon">
            <i className="bi bi-trash3-fill"></i>
        </div>

        <h2>Delete Admin</h2>

        <p>

            Are you sure you want to delete

            <strong>
                {" "}
                {adminToDelete?.firstName} {adminToDelete?.lastName}
            </strong>

            ?

        </p>

        <p className="delete-warning">

            This action cannot be undone.

        </p>

        <div className="delete-actions">

            <button
                className="cancel-btn"
                disabled={deleting}
                onClick={() => {
                    setShowDeleteModal(false);
                    setAdminToDelete(null);
                }}
            >
                Cancel
            </button>

            <button
                className="confirm-delete-btn"
                disabled={deleting}
                onClick={deleteAdmin}
            >
                {deleting ? "Deleting..." : "Delete Admin"}
            </button>

        </div>

    </div>

</div>

)}
       
        {/* TABLE */}
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Admin Id</th>
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
                currentUsers.map((admin) => (
                  // {filteredUsers.map((user) => (

                  <tr key={admin.UserId}>
                    <td>
                      <span className="user-id">{admin.userId}</span>
                    </td>
                    <td>
                      <span className="user-details">
                        {admin.firstName + " " + admin.lastName}
                      </span>
                    </td>
                    <td>
                      <span className="user-details">{admin.email}</span>
                    </td>
                    <td>
                      <span className="user-details">{admin.gender}</span>
                    </td>
                    <td>
                      <span className="user-details">{admin.mobileNumber}</span>
                    </td>
                    <td>
                      <span className="user-details">{admin.country}</span>
                    </td>

                    <td>
                      <div className="actions">
                        <button
                          className="view-btn"
                          onClick={() => handleAdmin(admin.userId)}
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>View</span>
                        </button>

                          <button
                              className="delete-btn"
                              onClick={() => {
                              setAdminToDelete(admin);
                              setShowDeleteModal(true);
                              }}
                              >
                              Delete
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


          <Pagination
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          indexOfLastModule= {indexOfLastUser}
          indexOfFirstModule = {indexOfFirstUser}
          currentModules = {currentUsers}
          filteredModules = {filteredAdmins}

      />
      
      </div>
    </div>
  );
}
export default Admins;