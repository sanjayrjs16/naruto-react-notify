import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "./Notification.module.css";

const Notification = ({ notification, removeNotification }) => {
  const { id, type, title, message, isLeaving } = notification;
  const dimensionRef = useRef();
  const [contentWidth, setContentWidth] = useState(0);
  const [isSmokeVisible, setSmokeVisible] = useState(true);
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  useEffect(() => {
    const exitSmokeTimer = setTimeout(() => {
      setSmokeVisible(false);
    }, 600);

    return () => {
      clearTimeout(exitSmokeTimer);
    };
  }, []);

  useLayoutEffect(() => {
    if (dimensionRef.current) {
      setContentWidth(dimensionRef.current.offsetWidth);
    }
  }, []);
  useEffect(() => {
    if (isLeaving) {
      setSmokeVisible(true); // Show the smoke when isLeaving is true
    }
  }, [isLeaving]);

  let imageSrc;

  switch (type) {
    case "success":
      imageSrc = "success.jpg";
      break;
    case "error":
      imageSrc = "error.png";
      break;
    case "warning":
      imageSrc = "warning.jpeg";
      break;
    case "info":
      imageSrc = "info.jpg";
      break;
    default:
      imageSrc = "info.jpg";
  }

  return (
    <>
      <div
        ref={dimensionRef}
        className={`${styles.notification} ${styles[type]}`}
        style={{ visibility: isLeaving ? "hidden" : "visible" }}
      >
        <img
          src={imageSrc}
          alt={type}
          className={styles.image}
          width={150}
          height={150}
        />
        <div className={styles.content}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <p className={styles.message}>{message}</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={() => {
            setCacheBuster(Date.now());
            setSmokeVisible(true);
            setTimeout(() => removeNotification(id), 600);
          }}
        >
          X
        </button>
      </div>

      {isSmokeVisible && (
        <img
          src={`./smoke.webp?${cacheBuster}`} // Append cacheBuster
          alt="smoke"
          width={contentWidth}
          className={` ${styles.smoke}`}
        />
      )}
    </>
  );
};

export default Notification;
