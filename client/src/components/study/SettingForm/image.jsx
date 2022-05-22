import React from "react";
import { ReactComponent as Thumbnail } from "./thumbnail.svg";

// TODO 바꾸기
function Image() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#212529",
        borderRadius: "4px",
        width: "100%",
        height: "100%",
        padding: "10%",
      }}
    >
      <Thumbnail />
    </div>
  );
}

export default Image;
