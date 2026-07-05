import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/Auth/Login";
import Dashboard from "../modules/admin/Dashboard/Dashboard";
import Users from "../modules/admin/Users/Users";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />

        {/* Admin Module */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Future Routes */}
        {/* <Route path="/admin/trips" element={<Trips />} /> */}
        {/* <Route path="/admin/bookings" element={<Bookings />} /> */}
        {/* <Route path="/admin/reports" element={<Reports />} /> */}
        {/* <Route path="/admin/settings" element={<Settings />} /> */}

        {/* User Module */}
        {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}

        {/* 404 Page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
