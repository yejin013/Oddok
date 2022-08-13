import React from "react";
import { Modal } from "@components/commons";
import { deleteAccount } from "@api/auth/auth-api";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";

function AccountDeleteModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);

  const onDeleteAccount = () => {
    deleteAccount()
      .then(() => {
        localStorage.setItem("isLogin", false);
        setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
        window.location.replace("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      title="계정 삭제"
      content="ODDOK 계정을 삭제하시겠습니까?"
      onClose={onClose}
      onAction={{ text: "삭제하기", action: () => onDeleteAccount() }}
    />
  );
}

export default AccountDeleteModal;
