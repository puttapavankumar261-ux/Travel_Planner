import { Routes, Route } from "react-router-dom";

import Dashboard from "../modules/Users/Dashboard/Dashboard";

// Future Imports
import Trips from "../modules/Users/Trips/Trips";
import Expenses from "../modules/Users/Expenses/Expenses";
import BookingWizard from "../modules/Users/Bookings/BookingWizard";
// import Profile from "../modules/user/Profile/Profile";

import CreateTripWizard from "../modules/Users/Trips/CreateTrip/CreateTripWizard";
import UserProfile from "../modules/Users/UserProfile/UserProfile";
import NotificationModel from "../modules/admin/Notifications/NotificationModel";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      {/* Future Routes */}

      <Route path="trips" element={<Trips />} />
      <Route path="trips/new" element={<CreateTripWizard />} />
      
      <Route path="book-trip" element={<BookingWizard />} />

      <Route path="expenses" element={<Expenses />} />

      {/* <Route path="bookings" element={<Bookings />} /> */}

      {/* <Route path="profile" element={<Profile />} /> */}
      <Route path="userprofile" element={<UserProfile/>} />
      <Route path="usernotifications" element={<NotificationModel/>} />
    </Routes>
  );
};

export default UserRoutes;
