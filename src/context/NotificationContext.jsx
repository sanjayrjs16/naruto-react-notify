import React, { createContext, useCallback, useContext, useState } from "react";
import NotificationContainer from "../component/Notification/NotificationContainer";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (newNotification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
        notifications,
        setNotifications,
      }}
    >
      {children}
      {[
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "top",
        "bottom",
        "center",
        "right",
        "left",
      ].map((position) => {
        return (
          <NotificationContainer
            key={position}
            notifications={notifications.filter((n) => n.position === position)}
            removeNotification={removeNotification}
            position={position}
          />
        );
      })}
    </NotificationContext.Provider>
  );
};
