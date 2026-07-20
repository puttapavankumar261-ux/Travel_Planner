import React, { useMemo, useState, useEffect } from "react";
import "./NotificationModel.css";


const NotificationModel = ({ open, onClose }) => {

  const notifications = [
    {
      id: 1,
      title: "New User Registered",
      message:
        "Rahul Sharma created a new account successfully and completed email verification.",
      time: "2 mins ago",
      type: "USER",
      icon: "bi-person-fill-add",
      color: "user",
      unread: true,
    },  
    {
      id: 2,
      title: "Hotel Reservation",
      message:
        "Hotel Taj Palace has been booked successfully for customer Priya Kumar.",
      time: "5 mins ago",
      type: "HOTEL",
      icon: "bi-building-fill-check",
      color: "hotel",
      unread: true,
    },
    {
      id: 3,
      title: "Payment Received",
      message:
        "₹8,450 payment received successfully for Goa Holiday Package.",
      time: "20 mins ago",
      type: "PAYMENT",
      icon: "bi-credit-card-fill",
      color: "payment",
      unread: false,
    },
    // {
    //   id: 5,
    //   title: "Booking Cancelled",
    //   message:
    //     "Customer cancelled hotel booking. Refund request has been initiated.",
    //   time: "35 mins ago",
    //   type: "CANCELLATION",
    //   icon: "bi-x-circle-fill",
    //   color: "cancel",
    //   unread: false,
    // },
    // {
    //   id: 6,
    //   title: "Destination Added",
    //   message:
    //     "New destination 'Andaman Islands' added successfully.",
    //   time: "1 hour ago",
    //   type: "DESTINATION",
    //   icon: "bi-geo-alt-fill",
    //   color: "destination",
    //   unread: false,
    // },
    {
      id: 4,
      title: "Support Ticket",
      message:
        "A customer reported a payment issue and created Support Ticket #SP2451.",
      time: "Yesterday",
      type: "SUPPORT",
      icon: "bi-headset",
      color: "support",
      unread: false,
    },
    {
      id: 5,
      title: "New Vendor Added",
      message:
        "A new hotel partner 'Grand Ocean Resort' has been added to the system.",
      time: "3 days ago",
      type: "VENDOR",
      icon: "bi-building-add",
      color: "vendor",
      unread: false,
    },
  ];

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowAll(false);
    }
  }, [open]);

  if (!open) return null;

  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 2);

  return (
    <div className="notification-dropdown">

      {/* Arrow */}
      <div className="dropdown-arrow"></div>

      {/* Header */}
      <div className="notification-header">

        <div className="header-left">

          <div className="bell-icon">
            <i className="bi bi-bell-fill"></i>
          </div>

          <div>
            <h3>Notifications</h3>
            <p>
              {unreadCount} New Notification
              {unreadCount !== 1 ? "s" : ""}
            </p>
          </div>

        </div>

        <div className="header-right">

          <button className="mark-read-btn">
            <i className="bi bi-check2-all"></i>
            Mark All
          </button>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

      </div>

      {/* Notification List */}

      <div className="notification-list">

        {displayedNotifications.map((item) => (

          <div
            key={item.id}
            className={`notification-card ${item.unread ? "unread" : ""}`}
          >

            <div className={`notification-icon ${item.color}`}>
              <i className={`bi ${item.icon}`}></i>
            </div>

            <div className="notification-content">

              <div className="notification-top">

                <h4>{item.title}</h4>

                <span className="notification-time">
                  {item.time}
                </span>

              </div>

              <p className="notification-message">
                {item.message}
              </p>

              <div className="notification-bottom">

                <span className={`notification-tag ${item.color}`}>
                  {item.type}
                </span>

                {item.unread && (
                  <span className="unread-dot"></span>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="notification-footer">

        <button
          className="view-all-btn"
          onClick={() => setShowAll(!showAll)}
        >

          <i
            className={`bi ${
              showAll
                ? "bi-chevron-up"
                : "bi-list-ul"
            }`}
          ></i>

          {showAll
            ? "Show Less"
            : "View All Notifications"}

        </button>

      </div>

    </div>
  );
};

export default NotificationModel;