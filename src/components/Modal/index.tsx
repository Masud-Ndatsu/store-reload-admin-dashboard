import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

type Props = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
