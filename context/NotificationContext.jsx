import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";
export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const showNotification = (notification) => {
    setNotifications(notification);
    setTimeout(() => {
      setNotifications(null);
    }, 2000);
  };
  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div style={{ position: "fixed" }}>
        {notifications && (
          <Notification
            title={notifications?.title}
            text={notifications?.text}
            position={notifications?.position}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "Notification can only be used withing the NotificationProvider"
    );
  return context;
};
