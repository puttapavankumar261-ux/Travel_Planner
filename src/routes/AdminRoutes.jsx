import { Routes, Route } from "react-router-dom";

import Dashboard from "../modules/admin/Dashboard/Dashboard";

// Future Imports
// import Trips from "../modules/admin/Trips/Trips";
// import Bookings from "../modules/admin/Bookings/Bookings";
// import Reports from "../modules/admin/Reports/Reports";
// import Settings from "../modules/admin/Settings/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />


      {/* Future Routes */}

      {/* <Route path="trips" element={<Trips />} /> */}

      {/* <Route path="bookings" element={<Bookings />} /> */}

      {/* <Route path="reports" element={<Reports />} /> */}

      {/* <Route path="settings" element={<Settings />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
