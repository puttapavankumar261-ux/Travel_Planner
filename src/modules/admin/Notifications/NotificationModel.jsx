import React, { useMemo, useState, useEffect } from "react";
import "./NotificationModel.css";
import authService from "../../../services/authService";



const NotificationModel = ({ open, onClose }) => {
const moduleConfig = {
  AUTH: {
    icon: "bi-shield-lock-fill",
    color: "auth",
  },
  USER: {
    icon: "bi-person-fill",
    color: "user",
  },
  TRIP: {
    icon: "bi-airplane-fill",
    color: "trip",
  },
  ITINERARY: {
    icon: "bi-map-fill",
    color: "itinerary",
  },
  BOOKING: {
    icon: "bi-building-fill-check",
    color: "booking",
  },
  PAYMENT: {
    icon: "bi-credit-card-fill",
    color: "payment",
  },
  EXPENSE: {
    icon: "bi-wallet2",
    color: "expense",
  },
  COMPANION: {
    icon: "bi-people-fill",
    color: "companion",
  },
  NOTIFICATION: {
    icon: "bi-bell-fill",
    color: "notification",
  },
  SYSTEM: {
    icon: "bi-cpu-fill",
    color: "system",
  },
};

const formatTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600)
    return `${Math.floor(diff / 60)} mins ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hrs ago`;

  if (diff < 172800)
    return "Yesterday";

  return created.toLocaleDateString();
};


      const [notifications, setNotifications] = useState([]);
      const [loading, setLoading] = useState(false);
        const [showAll, setShowAll] = useState(false);

      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const userId = loggedUser?.userId;

      const loadNotifications = async () => {
        try {
          setLoading(true);

          const response = await authService.getNotificationsByUser();

          //setNotifications(response);

          const notificationList = (response.data || response).map((item) => ({
            ...item,

            unread: !item.isRead,

            icon:
              moduleConfig[item.module]?.icon ||
              "bi-bell-fill",

            color:
              moduleConfig[item.module]?.color ||
              "notification",

            time: formatTime(item.createdAt),

            type: item.module,
          }));

        setNotifications(notificationList);

        } catch (error) {
          console.error("Failed to load notifications", error);
        } finally {
          setLoading(false);
        }
      };

  // const unreadCount = useMemo(
  //   () => notifications.filter((item) => item.unread).length,
  //   [notifications]
  // );

const unreadCount = useMemo(
  () => notifications.filter((item) => !item.isRead).length,
  [notifications]
);



  useEffect(() => {
  if (open) {
    loadNotifications();
  } else {
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
            key={item.notificationId}
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
                  {item.module}
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