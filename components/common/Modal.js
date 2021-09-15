import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "@/styles/Modal.module.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const modalRef = useRef(null);

  const backDropHandler = (e) => {
    console.log(e.target);
    if (!modalRef?.current?.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    setIsBrowser(true);

    // attach event listener to the whole windor with our handler
    window.addEventListener("click", backDropHandler);

    // remove the event listener when the modal is closed
    return () => window.removeEventListener("click", backDropHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          {title ? <h5>{title}</h5> : <h5>Modal</h5>}
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
