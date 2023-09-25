import { useContext, useEffect, useCallback } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const useNotification = () => {
  const {
    addNotification,
    removeNotification,
    notifications,
    setNotifications,
  } = useContext(NotificationContext);

  const prepareToRemoveNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isLeaving: true }
          : notification
      )
    );

    // Remove the notification after the exit animation has had time to complete
    setTimeout(() => {
      removeNotification(id);
    }, 400); // This should match the duration of your smoke animation
  };

  const showNotification = useCallback((options) => {
    const id = Date.now();
    const { type, title, message, image, position, duration = 5000 } = options;

    const timer = setTimeout(() => {
      prepareToRemoveNotification(id);
    }, duration);

    addNotification({
      id,
      type,
      title,
      message,
      image,
      position,
      timer,
      isLeaving: false,
    });
  }, []);

  return { showNotification };
};
