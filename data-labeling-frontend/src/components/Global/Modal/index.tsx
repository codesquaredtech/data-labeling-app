import React, { useRef } from "react";
import useOutsideClick from "../../../hooks/outsideClick";
import { ModalProps } from "./types";

export default function Modal({
  setOpen,
  onClose,
  open = false,
  title = "",
  visibleOverflow = false,
  buttonTitle = "open modal",
  buttonColor = "primary",
  name = "",
  closeButton = true,
  hideButton = false,
  children,
  preventClickOutside = false,
}: ModalProps) {
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  const modalRef = useRef(null);
  if (!preventClickOutside) {
    useOutsideClick(modalRef, handleClose);
  }

  return (
    <>
      {!hideButton && (
        <label
          htmlFor={`modal-${name}`}
          onClick={() => setOpen(!open)}
          className={`btn btn-${buttonColor} modal-button`}
        >
          {buttonTitle}
        </label>
      )}
      <input type="checkbox" checked={open} id={`modal-${name}`} readOnly className="modal-toggle" />
      <label htmlFor={`modal-${name}`} className="modal cursor-pointer">
        <label ref={modalRef} className={`modal-box relative ${visibleOverflow ? "overflow-visible" : ""}`} htmlFor="">
          <div className="text-xl text-base-content absolute left-6 top-4">{title}</div>
          <div className="divider mt-4 before:bg-gradient-to-r before:from-primary before:to-base-100 after:bg-transparent" />
          {closeButton && (
            <label
              onClick={handleClose}
              htmlFor={`modal-${name}`}
              className="btn btn-sm btn-circle absolute right-4 top-4"
            >
              ✕
            </label>
          )}
          <div className="mt-6">{children}</div>
        </label>
      </label>
    </>
  );
}
