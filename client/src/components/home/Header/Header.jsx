import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "@recoil/user-state";
import { Search, Profile } from "@icons";
import { getNickname } from "@api/user-api";
import { NicknameEditModal } from "@components/commons";
import { KAKAO_LOGOUT_URL } from "@api/kakao";
import styles from "./Header.module.css";

function Header() {
  const history = useHistory();
  const [user, setUserState] = useRecoilState(userState);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(async () => {
    if (!user.isLogin || user.nickname !== null) {
      return;
    }
    await getNickname()
      .then((response) => setUserState((prev) => ({ ...prev, nickname: response.nickname })))
      .catch((error) => console.error("get nickname error", error));
  }, []);

  const goToMain = () => {
    history.push({
      pathname: "/",
    });
  };

  const goToMypage = () => {
    history.push({
      pathname: "/mypage",
    });
  };

  const goToSearch = () => {
    history.push({
      pathname: "/search",
    });
  };

  const goToCreateRoom = () => {
    history.push({
      pathname: "/studyroom/create",
    });
  };

  const goToLogin = () => {
    history.push({
      pathname: "/login",
    });
  };

  const clickProfileBtn = () => {
    setIsDropdown((prev) => !prev);
  };

  const clickNicknameEditBtn = () => {
    setIsModalOpen((prev) => !prev);
    setIsDropdown((prev) => !prev);
  };

  const onClose = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      {isModalOpen && <NicknameEditModal onClose={onClose} />}
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">ODDOK</a>
        </div>
        <ul className={styles.pages}>
          <li>
            <button
              type="button"
              className={history.location.pathname === "/" ? styles.clicked : ""}
              onClick={goToMain}
            >
              ????????????
            </button>
          </li>
          <li>
            {!user.isLogin ? (
              <button type="button" className={styles.mypage} onClick={goToLogin}>
                ???????????????
              </button>
            ) : (
              <button
                type="button"
                className={history.location.pathname === "/mypage" ? styles.clicked : ""}
                onClick={goToMypage}
              >
                ???????????????
              </button>
            )}
          </li>
        </ul>
        <div className={styles.buttons}>
          <button type="button" className={styles.search} onClick={goToSearch}>
            <Search />
          </button>
          <ul className={styles.my_info}>
            <li>
              <button type="button" className={styles.profile} onClick={clickProfileBtn}>
                <Profile />
                <span className={styles.nickname}>{user.nickname}</span>
              </button>
            </li>
            {user.isLogin && isDropdown && (
              <ul className={styles.info_buttons}>
                <li>
                  <button type="button" className={styles.button} onClick={clickNicknameEditBtn}>
                    ????????? ??????
                  </button>
                </li>
                <li>
                  <a href={KAKAO_LOGOUT_URL}>
                    <button type="button" className={styles.button}>
                      ????????????
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </ul>
          {!user.isLogin ? (
            <button type="button" className={styles.study_button} onClick={goToLogin}>
              + ??? ????????? ?????????
            </button>
          ) : (
            <button type="button" className={styles.study_button} onClick={goToCreateRoom}>
              + ??? ????????? ?????????
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
export default Header;
