import React from "react";
import { Thumbnail as ThumbnailImage } from "@icons";
import styles from "./Thumbnail.module.css";

function Thumbnail() {
  return (
    <div className={styles.image_box}>
      <ThumbnailImage />
    </div>
  );
}

export default Thumbnail;
