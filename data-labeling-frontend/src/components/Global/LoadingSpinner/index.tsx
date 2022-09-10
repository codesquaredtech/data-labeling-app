import React from "react";
import { LoadingSpinnerProps, Size } from "./types";
import "./styles/loadingSpinner.scss";

function LoadingSpinner({ size = Size.M }: LoadingSpinnerProps) {
  return (
    <div className="spinner border-0">
      <div className="double-bounce1"></div>
      <div className="double-bounce2 bg-neutral-content"></div>
    </div>
  );
}

export default LoadingSpinner;
