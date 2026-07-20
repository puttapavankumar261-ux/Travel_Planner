import { Routes, Route } from "react-router-dom";

import Dashboard from "../modules/admin/Dashboard/Dashboard";
import Trips from "../modules/admin/Trips/Trips";
import Users from "../modules/admin/Users/Users";
import Bookings from "../modules/admin/Bookings/Bookings";
import AdminProfile from "../modules/admin/Users/AdminProfile";
import AdminsManagement from "../modules/admin/Admins_management/Admins_management";
// Future Imports

import Reports from "../modules/admin/Reports/Reports";
// import Settings from "../modules/admin/Settings/Settings";

import Settings from "../modules/admin/Settings/Settings";
import NotificationModel from "../modules/admin/Notifications/NotificationModel";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      {/* Admin Routes */}
      <Route path="users" element={<Users />} />
      <Route path="trips" element={<Trips />} />
      <Route path="bookings" element={<Bookings />} />

      <Route path="admins" element={<AdminsManagement />} />
      <Route path="reports" element={<Reports />} />

      <Route path="settings" element={<Settings />} />
      <Route path="adminprofile" element={<AdminProfile />} />
      <Route path="notifications" element={<NotificationModel />} />
    </Routes>
  );
};

export default AdminRoutes;
