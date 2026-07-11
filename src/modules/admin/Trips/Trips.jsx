import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./Trips.css";
        {/* Your Trips page content */}

function Trips() {
  const [search, setSearch] = useState("");
const [showForm, setShowForm] = useState(false);
const [editId, setEditId] = useState(null);

const [editTrip, setEditTrip] = useState({
  destination: "",
  duration: "",
  price: "",
  seats: "",
  status: "Available",
});
const [newTrip, setNewTrip] = useState({
  destination: "",
  duration: "",
  price: "",
  seats: "",
  status: "Available",
});
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: "Goa",
      duration: "3 Days",
      price: "₹12,000",
      seats: 25,
      status: "Available",
    },
    {
      id: 2,
      destination: "Manali",
      duration: "5 Days",
      price: "₹18,500",
      seats: 18,
      status: "Available",
    },
    {
      id: 3,
      destination: "Kerala",
      duration: "4 Days",
      price: "₹15,500",
      seats: 12,
      status: "Available",
    },
    {
      id: 4,
      destination: "Kashmir",
      duration: "7 Days",
      price: "₹32,000",
      seats: 0,
      status: "Full",
    },
    {
      id: 5,
      destination: "Ooty",
      duration: "2 Days",
      price: "₹9,500",
      seats: 20,
      status: "Available",
    },
  ]);
  const filteredTrips = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase())
  );
  const deleteTrip = (id) => {
  setTrips(trips.filter((trip) => trip.id !== id));
};
  return (
   <div className="dashboard-page">
     <Navbar />

      <div className="dashboard-wrapper trips-wrapper">
      <div className="trips-container">
      <div className="trips-header">
        <h2>Trips Management</h2>

        <button
            className="add-btn"
            onClick={() => setShowForm(true)}
        >
            + Add Trip
        </button>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="Search Destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
{showForm && (
  <div className="trip-form">

    <input
      placeholder="Destination"
      value={newTrip.destination}
      onChange={(e) =>
        setNewTrip({ ...newTrip, destination: e.target.value })
      }
    />

    <input
      placeholder="Duration"
      value={newTrip.duration}
      onChange={(e) =>
        setNewTrip({ ...newTrip, duration: e.target.value })
      }
    />

    <input
      placeholder="Price"
      value={newTrip.price}
      onChange={(e) =>
        setNewTrip({ ...newTrip, price: e.target.value })
      }
    />

    <input
      placeholder="Seats"
      value={newTrip.seats}
      onChange={(e) =>
        setNewTrip({ ...newTrip, seats: e.target.value })
      }
    />

    <button
      className="add-btn"
      onClick={() => {
        setTrips([
          ...trips,
          {
            id: trips.length + 1,
            ...newTrip,
          },
        ]);

        setNewTrip({
          destination: "",
          duration: "",
          price: "",
          seats: "",
          status: "Available",
        });

        setShowForm(false);
      }}
    >
      Save Trip
    </button>

  </div>
)}
      <table className="trips-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTrips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.destination}</td>
              <td>{trip.duration}</td>
              <td>{trip.price}</td>
              <td>{trip.seats}</td>

              <td>
                <span
                  className={`status ${
                    trip.status === "Available"
                      ? "available"
                      : "full"
                  }`}
                >
                  {trip.status}
                </span>
              </td>

              <td>
                <button
  className="edit-btn"
  onClick={() => {
    setEditId(trip.id);
    setEditTrip(trip);
    setShowForm(true);
  }}
>
  Edit
</button>

                <button
  className="delete-btn"
  onClick={() => deleteTrip(trip.id)}
>
  Delete
</button>
              </td>
            </tr>
          ))}

          {filteredTrips.length === 0 && (
            <tr>
              <td colSpan="7" className="no-data">
                No Trips Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
          </div>
    </div>
  </div>
);
}
