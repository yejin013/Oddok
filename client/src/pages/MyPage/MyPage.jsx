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
      <div className={styles.container}>
        <SideNavBar indexRef={indexRef} />
        <main ref={targetRef}>
          <MyGoal />
          <StudyTime />
          <MyRoom />
          <MyAccount />
        </main>
      </div>
    </Layout>
  );
}

export default MyPage;
