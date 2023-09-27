import { useState, useCallback, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { v4 as uuidv4 } from "uuid";
export const useNotification = () => {
  const {
    addNotification,
    removeNotification,
    notifications,
    setNotifications,
  } = useContext(NotificationContext);
  const prepareToRemoveNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isLeaving: true } : notif
      )
    );

    setTimeout(() => {
      removeNotification(id);
    }, 400);
  };
  const showNotification = useCallback((options) => {
    const id = uuidv4();
    const { type, title, message, duration = 2000 } = options;
    const timer = setTimeout(() => {
      prepareToRemoveNotification(id);
    }, duration);
    addNotification({
      ...options,
      id,
      isLeaving: false,
    });
  }, []);
  return { showNotification };
};
