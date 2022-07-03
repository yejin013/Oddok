import React from "react";
import { logout } from "@api/auth-api";
import { Modal } from "@components/commons";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";

function LogoutModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);

  const userLogout = () => {
    logout()
      .then(() => {
        localStorage.removeItem("isLogin");
        setUserState({ ...user, nickname: null, isLogin: localStorage.getItem("isLogin") }); // 유저 상태 초기화
        window.location.replace("/"); // 메인홈으로 새로고침
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      title="로그아웃"
      content="정말로 로그아웃 하시겠습니까?"
      onClose={onClose}
      onAction={{ text: "로그아웃", action: () => userLogout() }}
    />
  );
}

export default LogoutModal;
