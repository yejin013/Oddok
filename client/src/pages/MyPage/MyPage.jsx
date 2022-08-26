import React from "react";
import { SideNavBar, MyGoal, StudyTime, MyRoom, MyAccount } from "@components/mypage";
import { Layout } from "@components/layout";
import styles from "./MyPage.module.css";

function MyPage() {
  return (
    <Layout>
      <div className={styles.mypage}>
        <aside className={styles.side_nav_bar}>
          <SideNavBar />
        </aside>
        <div className={styles.container}>
          <MyGoal />
          <StudyTime />
          <MyRoom />
          <MyAccount />
        </div>
      </div>
    </Layout>
  );
}

export default MyPage;
