import { Routes, Route } from "react-router-dom";

import Dashboard from "../modules/Users/Dashboard/Dashboard";

// Future Imports
import Trips from "../modules/Users/Trips/Trips";
import Expenses from "../modules/Users/Expenses/Expenses";
// import Bookings from "../modules/user/Bookings/Bookings";
// import Profile from "../modules/user/Profile/Profile";

import CreateTripWizard from "../modules/Users/Trips/CreateTrip/CreateTripWizard";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      {/* Future Routes */}

      <Route path="trips" element={<Trips />} />
      <Route path="trips/new" element={<CreateTripWizard />} />

      <Route path="expenses" element={<Expenses />} />

      {/* <Route path="bookings" element={<Bookings />} /> */}

      {/* <Route path="profile" element={<Profile />} /> */}
    </Routes>
  );
};

export default UserRoutes;
