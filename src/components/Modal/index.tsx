import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

type Props = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  React.useEffect(() => {
    const element = document.createElement("div");
    element.id = "modal-root";
    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);

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
