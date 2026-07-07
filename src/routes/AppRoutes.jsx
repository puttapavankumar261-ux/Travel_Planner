import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/Auth/Login";

import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}

        <Route path="/" element={<Login />} />

        {/* Admin Module */}

        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User Module */}

        <Route path="/user/*" element={<UserRoutes />} />

        {/* Future */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
