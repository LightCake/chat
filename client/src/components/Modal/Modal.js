import React from "react";
import "./Modal.css";

const Modal = ({ isShowing, hide, children }) =>
  isShowing ? (
    <div className="modal_overlay">
      <div className="modal">
        <div className="modal_header">
          <button className="modal_close_button" onClick={hide}>
            <span>&times;</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;

export default Modal;
