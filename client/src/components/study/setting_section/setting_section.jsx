import React from "react";
import styles from "./setting_section.module.css";

function SettingSection({ clickSettingBtn }) {
  return (
    <section className={styles.page}>
      <h1>setting page</h1>
      <button type="button" onClick={clickSettingBtn}>
        설정완료
      </button>
    </section>
  );
}

export default SettingSection;
