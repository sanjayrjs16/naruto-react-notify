import React, { createContext, useState } from "react";
import NotificationContainer from "../components/Notification/NotificationContainer";
export const NotificationContext = createContext({});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotificaitons) => [
      ...prevNotificaitons,
      notification,
    ]);
  };
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id != id)
    );
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        setNotifications,
      }}
    >
      {children}
      {[
        "top-left",
        "top-right",
        "bottom-right",
        "bottom-left",
        "left",
        "right",
        "center",
        "top",
        "bottom",
      ].map((position) => (
        <NotificationContainer
          key={position}
          notifications={notifications.filter(
            (notification) => notification.position === position
          )}
          position={position}
          removeNotification={removeNotification}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
