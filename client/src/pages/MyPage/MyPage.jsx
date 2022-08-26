import React, { useRef, useEffect } from "react";
import { SideNavBar, MyGoal, StudyTime, MyRoom, MyAccount } from "@components/mypage";
import { Layout } from "@components/layout";
import styles from "./MyPage.module.css";

function MyPage() {
  const indexRef = useRef();
  const targetRef = useRef();

  useEffect(() => {
    const indexNodes = [...indexRef.current.children].filter((e) => e.children.length === 0);
    indexNodes.map((node, i) =>
      node.addEventListener("click", () => {
        targetRef.current.children[i].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }),
    );
  }, []);

  return (
    <Layout>
      <div className={styles.mypage}>
        <SideNavBar indexRef={indexRef} />
        <div ref={targetRef} className={styles.container}>
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
