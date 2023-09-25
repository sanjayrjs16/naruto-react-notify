import React from "react";
import Notification from "./Notification";
import styles from "./Notification.module.css";

const NotificationContainer = ({
  notifications,
  removeNotification,
  position,
}) => {
  return (
    <div className={styles[position]}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
