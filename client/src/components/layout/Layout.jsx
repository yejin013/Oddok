import React from "react";
import { Header, Footer } from "@components/home";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
