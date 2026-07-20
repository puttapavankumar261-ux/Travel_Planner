import React, { useMemo, useState, useEffect } from "react";
import "./NotificationModel.css";


const NotificationModel = ({ open, onClose }) => {

  const notifications = [
    
  {
    id: 1,
    title: "Flight Booking Confirmed",
    message:
      "Your flight from Bengaluru to Goa has been confirmed successfully.",
    time: "2 mins ago",
    type: "FLIGHT",
    icon: "bi-airplane-fill",
    color: "flight",
    unread: true,
  },
  {
    id: 2,
    title: "Hotel Check-in Reminder",
    message:
      "Your check-in at Taj Resort, Goa starts tomorrow at 2:00 PM.",
    time: "30 mins ago",
    type: "HOTEL",
    icon: "bi-building-fill-check",
    color: "hotel",
    unread: true,
  },
  {
    id: 3,
    title: "Payment Successful",
    message:
      "₹8,450 has been successfully paid for your Goa Holiday Package.",
    time: "1 hour ago",
    type: "PAYMENT",
    icon: "bi-credit-card-fill",
    color: "payment",
    unread: false,
  },
  {
    id: 4,
    title: "Bus Ticket Confirmed",
    message:
      "Your Bengaluru → Mysore bus ticket has been confirmed.",
    time: "Today",
    type: "BUS",
    icon: "bi-bus-front-fill",
    color: "bus",
    unread: false,
  },
  {
    id: 5,
    title: "Train Ticket Confirmed",
    message:
      "Your Chennai Express train ticket has been confirmed.",
    time: "Today",
    type: "TRAIN",
    icon: "bi-train-front-fill",
    color: "train",
    unread: false,
  },
  // {
  //   id: 6,
  //   title: "Trip Reminder",
  //   message:
  //     "Your Kashmir trip starts in 2 days. Complete web check-in before departure.",
  //   time: "Yesterday",
  //   type: "REMINDER",
  //   icon: "bi-calendar-event-fill",
  //   color: "reminder",
  //   unread: false,
  // },
  
  // {
  //   id: 7,
  //   title: "Exclusive Offer",
  //   message:
  //     "Get 20% OFF on your next domestic flight booking. Offer ends soon!",
  //   time: "2 days ago",
  //   type: "OFFER",
  //   icon: "bi-gift-fill",
  //   color: "offer",
  //   unread: false,
  // },
  // {
  //   id: 8,
  //   title: "Price Drop Alert",
  //   message:
  //     "Flights to Dubai are now ₹3,200 cheaper than yesterday.",
  //   time: "3 days ago",
  //   type: "PRICE",
  //   icon: "bi-graph-down-arrow",
  //   color: "price",
  //   unread: false,
  // },

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
    <div className="notification-userdropdown">

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