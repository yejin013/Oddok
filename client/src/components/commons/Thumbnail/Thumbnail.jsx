import React from "react";
import { Thumbnail as ThumbnailImage } from "@icons";
import styles from "./Thumbnail.module.css";

function Thumbnail({ children }) {
  return (
    <div className={styles.wrapper}>
      <ThumbnailImage />
      {children}
    </div>
  );
}

export default Thumbnail;
