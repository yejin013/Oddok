import React from "react";
import { Header, Footer } from "@components/commons";
import styles from "./MainLayout.module.css";

function MainLayout({ children }) {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
