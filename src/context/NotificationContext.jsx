import React, { createContext, useState } from "react";

const NotificationContext = createContext({});
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
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
