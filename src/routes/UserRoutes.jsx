import { Routes, Route } from "react-router-dom";

import Dashboard from "../modules/Users/Dashboard/Dashboard";

// Future Imports
// import Trips from "../modules/user/Trips/Trips";
// import Expenses from "../modules/user/Expenses/Expenses";
// import Bookings from "../modules/user/Bookings/Bookings";
// import Profile from "../modules/user/Profile/Profile";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      {/* Future Routes */}

      {/* <Route path="trips" element={<Trips />} /> */}

      {/* <Route path="expenses" element={<Expenses />} /> */}

      {/* <Route path="bookings" element={<Bookings />} /> */}

      {/* <Route path="profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default UserRoutes;
