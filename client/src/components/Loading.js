import React from "react";

const Loading = () => {
  return (
    <div style={spinnerWrap}>
      <div style={spinner}>Loading...</div>
    </div>
  );
};

export default Loading;

const spinnerWrap = {
  position: "fixed",
  width: "100%",
  height: "100%",
  display: "flex",
  background: "rgb(255 255 255 / 65%)",
  top: "0",
  zIndex: "10000000",
};

const spinner = {
  margin: "auto",
};
