import React from "react";
import { ReactComponent as ThumbnailImage } from "../../../assets/icons/thumbnail.svg";

import styles from "./thumbnail.module.css";

function Thumbnail() {
  return (
    <div className={styles.image_box}>
      <ThumbnailImage />
    </div>
  );
}

export default Thumbnail;
