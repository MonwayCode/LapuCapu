import React from "react";

function SuccessAlert({ message, onClose }) {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default SuccessAlert;
