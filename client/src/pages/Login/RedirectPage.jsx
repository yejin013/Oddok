import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { getKakaoToken, login } from "@api/auth-api";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { errorState } from "@recoil/error-state";
import { Loading } from "@components/commons";
import useAsync from "@hooks/useAsync";

function RedirectPage() {
  const authCode = new URL(window.location.href).searchParams.get("code"); // 파라미터로 넘어온 인가코드를 가져옴
  // const history = useHistory();
  const [token, setToken] = useState(null);
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);
  const { loading: isLoading, request: onLogin } = useAsync({
    requestFn: login,
    onSuccess: () => {
      localStorage.setItem("isLogin", true);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: (error) => setError(error),
  });

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
    onLogin(token);
  }, [token]);

  return <div>{isLoading && <Loading />}</div>;
}

export default RedirectPage;

/*
  {loginError && (
        <Modal
          title="로그인 실패"
          content="로그인에 실패하였습니다. 다시 시도해주시기 바랍니다."
          onClose={() => history.push("/login")}
          onAction={{ text: "로그인 다시 하기", action: () => history.push("/login") }}
        />
      )}
*/
