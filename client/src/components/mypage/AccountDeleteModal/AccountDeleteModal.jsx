import React from "react";
import { Loading, Modal } from "@components/commons";
import { deleteAccount } from "@api/auth/auth-api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { errorState } from "@recoil/error-state";
import useAsync from "@hooks/useAsync";

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

  // const onDeleteAccount = () => {
  //   deleteAccount()
  //     .then(() => {
  //       localStorage.setItem("isLogin", false);
  //       setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
  //       window.location.replace("/");
  //     })
  //     .catch((error) => setError(error));
  // };

  return (
    <>
      {isLoading && <Loading />}
      <Modal
        title="계정 삭제"
        content="ODDOK 계정을 삭제하시겠습니까?"
        onClose={onClose}
        onAction={{ text: "삭제하기", action: onDeleteAccount }}
      />
    </>
  );
}

export default AccountDeleteModal;
