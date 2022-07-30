import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getKakaoToken, login } from "@api/auth-api";
import { useRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { Modal, Loading } from "@components/commons";
import useAsync from "@hooks/useAsync";

function RedirectPage() {
  const authCode = new URL(window.location.href).searchParams.get("code"); // 파라미터로 넘어온 인가코드를 가져옴
  const history = useHistory();
  const [token, setToken] = useState(null);
  const [user, setUserState] = useRecoilState(userState);
  const { loading: isLoading, error: loginError, sendRequest: onLogin } = useAsync(login);

  useEffect(() => {
    if (!authCode) {
      return;
    }
    getKakaoToken(authCode)
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    onLogin(token)
      .then(() => {
        localStorage.setItem("isLogin", true); // 로그인상태 설정
        setUserState({ ...user, isLogin: localStorage.getItem("isLogin") });
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <>
      {isLoading && <Loading />}
      {loginError && (
        <Modal
          title="로그인 실패"
          content="로그인에 실패하였습니다. 다시 시도해주시기 바랍니다."
          onClose={() => history.push("/login")}
          onAction={{ text: "로그인 다시 하기", action: () => history.push("/login") }}
        />
      )}
    </>
  );
}

export default RedirectPage;
