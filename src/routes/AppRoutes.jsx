import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/Auth/Login";
import Dashboard from "../modules/admin/Dashboard/Dashboard";
import Users from "../modules/admin/Users/Users";
// import Role from "../modules/admin/Role";   // Remove this
// import NotFound from "../modules/public/NotFound"; // Remove if not created

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
