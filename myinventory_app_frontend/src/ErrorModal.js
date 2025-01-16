import React from "react";
 
const ErrorModal = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          minWidth: "300px"
        }}
      >
        <h3>Error</h3>
        <p>{message}</p>
        <button
          onClick={onClose}
          style={{ marginTop: "10px", padding: "5px 10px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
 
export default ErrorModal;