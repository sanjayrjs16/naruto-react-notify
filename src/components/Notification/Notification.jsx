import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "./Notification.module.css";
const Notification = ({ notification, removeNotification }) => {
  const [isSmokeVisible, setIsSmokeVisible] = useState(true);
  const [cacheBuster, setCacheBuster] = useState(Date.now());
  const [contentWidth, setContentWidth] = useState(0);
  const dimensionRef = useRef(null);
  const { type, title, message, duration, id, isLeaving } = notification;
  useEffect(() => {
    const smokeTimer = setTimeout(() => {
      setIsSmokeVisible(false);
    }, 600);
    return () => {
      clearTimeout(smokeTimer);
    };
  }, []);
  useLayoutEffect(() => {
    if (dimensionRef?.current) {
      setContentWidth(dimensionRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (isLeaving) setIsSmokeVisible(true);
  }, [isLeaving]);
  let imageSrc;
  switch (type) {
    case "success": {
      imageSrc = "success.jpg";
      break;
    }
    case "error": {
      imageSrc = "error.png";
      break;
    }
    case "info": {
      imageSrc = "info.jpg";
      break;
    }
    case "warning": {
      imageSrc = "warning.jpeg";
      break;
    }
    default: {
      imageSrc = "success.jpg";
      break;
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <div
        ref={dimensionRef}
        className={`${styles.notification} ${styles[type]}`}
        style={{ visibility: isLeaving ? "hidden" : "visible" }}
      >
        <img
          alt={type}
          src={imageSrc}
          width={150}
          height={150}
          className={styles.image}
        />
        <div className={styles.content}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <p className={styles.message}>{message}</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={() => {
            removeNotification(id);
          }}
        >
          X
        </button>
      </div>
      {isSmokeVisible && (
        <img
          alt={type}
          src={`smoke.webp?${cacheBuster}`}
          width={contentWidth}
          className={styles.smoke}
        />
      )}
    </div>
  );
};

export default Notification;
