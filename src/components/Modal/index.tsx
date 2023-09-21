import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

type Props = {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

export const Modal = ({ isOpen, onClose, children, style }: Props) => {
    if (!isOpen) return <React.Fragment></React.Fragment>;

    return ReactDOM.createPortal(
        <div>
            <div className="modal-overlay">
                <div className="modal" style={style}>
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
