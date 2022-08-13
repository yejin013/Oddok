import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "@api/auth/auth-api";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import useAsync from "@hooks/useAsync";
import { Loading, Modal } from "@components/commons";

function LogoutRedirectPage() {
  const history = useHistory();
  const [user, setUserState] = useRecoilState(userState);
  const { loading: isLoading, error: isError, request: onLogout } = useAsync({ requestFn: logout });

  useEffect(() => {
    onLogout()
      .then(() => {
        localStorage.setItem("isLogin", false);
        setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")), nickname: null });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {isError && (
        <Modal
          title="로그아웃 실패"
          content="로그아웃에 실패하였습니다. 다시 시도해주시기 바랍니다."
          onClose={() => history.push("/")}
          onAction={{ text: "메인으로 돌아가기", action: () => history.push("/") }}
        />
      )}
    </>
  );
}

export default LogoutRedirectPage;
