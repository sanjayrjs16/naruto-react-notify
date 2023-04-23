import React from "react";

const Notification = ({ title, message, position }) => {
  const alignment = { top: 0, bottom: 0, left: 0, right: 0 };

  return (
    <div
      style={{
        position: "fixed",
        ...alignment,
        border: "2px solid black",
        padding: "10px",
      }}
    >
      {title}
      {message}
    </div>
  );
};

export default Notification;
