import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div
      style={{
        textAlign: "center",
        margin: "50px",
      }}>
      <BeatLoader
        cssOverride={override}
        size={15}
        color={"var(--main-blue)"}
        loading={true}
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
