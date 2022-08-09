import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "@recoil/user-state";
import { Search, Profile } from "@icons";
import { getNickname } from "@api/user-api";
import { NicknameEditModal } from "@components/commons";
import { KAKAO_LOGOUT_URL } from "@api/kakao";
import useOutSideClick from "@hooks/useOutSideClick";
import useModal from "@hooks/useModal";
import styles from "./Header.module.css";

function Header() {
  const history = useHistory();
  const [user, setUserState] = useRecoilState(userState);
  const [isDropdown, setIsDropdown] = useState(false);
  const { isModal, openModal, closeModal } = useModal();
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsDropdown(false));

  useEffect(() => {
    if (!user.isLogin || user.nickname !== null) {
      return;
    }
    getNickname()
      .then((response) => setUserState((prev) => ({ ...prev, nickname: response.nickname })))
      .catch((error) => console.error(error));
  }, [user.isLogin, user.nickname]);

  const goToPage = (page) => {
    switch (page) {
      case "main":
        return () => history.push("/");
      case "mypage":
        return () => history.push("/mypage");
      case "search":
        return () => history.push("/search");
      case "create":
        return () => history.push("/studyroom/create");
      default:
        return () => history.push("*");
    }
  };

  const onProfileBtnClick = () => {
    setIsDropdown((prev) => !prev);
  };

  const onNicknameEditBtnClick = () => {
    openModal();
    setIsDropdown(false);
  };

  return (
    <>
      {isModal && <NicknameEditModal onClose={closeModal} />}
      <header className={styles.header}>
        <div className={styles.logo}>
          <a href="/">ODDOK</a>
        </div>
        <ul className={styles.pages}>
          <li>
            <button
              type="button"
              className={history.location.pathname === "/" ? styles.clicked : ""}
              onClick={goToPage("main")}
            >
              스터디룸
            </button>
          </li>
          <li>
            <button
              type="button"
              className={history.location.pathname === "/mypage" ? styles.clicked : ""}
              onClick={goToPage("mypage")}
            >
              마이페이지
            </button>
          </li>
        </ul>
        <ul className={styles.buttons}>
          <li>
            <button type="button" className={styles.search} onClick={goToPage("search")}>
              <Search />
            </button>
          </li>
          <li ref={dropdownRef} className={styles.my_info}>
            <button type="button" className={styles.profile} onClick={onProfileBtnClick}>
              <Profile />
              <span className={styles.nickname}>{user.nickname}</span>
            </button>
            {user.isLogin && isDropdown && (
              <ul className={styles.info_buttons}>
                <li>
                  <button type="button" className={styles.button} onClick={onNicknameEditBtnClick}>
                    닉네임 수정
                  </button>
                </li>
                <li>
                  <a href={KAKAO_LOGOUT_URL}>
                    <button type="button" className={styles.button}>
                      로그아웃
                    </button>
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button type="button" className={styles.study_button} onClick={goToPage("create")}>
              + 새 스터디 만들기
            </button>
          </li>
        </ul>
      </header>
    </>
  );
}
export default Header;
