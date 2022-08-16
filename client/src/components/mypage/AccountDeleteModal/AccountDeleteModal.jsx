import React from "react";
import { Modal } from "@components/commons";
import { deleteAccount } from "@api/auth/auth-api";
import useAsync from "@hooks/useAsync";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { errorState } from "@recoil/error-state";

function AccountDeleteModal({ onClose }) {
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  const { loading: isLoading, request: onDeleteAccount } = useAsync({
    requestFn: deleteAccount,
    onSuccess: () => {
      localStorage.setItem("isLogin", false);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
      window.location.replace("/");
    },
    onError: (error) => setError(error),
  });

  return (
    <Modal
      title="계정 삭제"
      content="ODDOK 계정을 삭제하시겠습니까?"
      onClose={onClose}
      onAction={{ text: "삭제하기", action: onDeleteAccount }}
      isLoading={isLoading}
    />
  );
}

export default AccountDeleteModal;
