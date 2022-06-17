import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getKakaoToken, login } from "@api/auth-api";
import { Modal, Loading } from "@components/commons";
import useAsync from "@hooks/useAsync";

function RedirectPage() {
  const history = useHistory();
  const authCode = new URL(window.location.href).searchParams.get("code"); // 파라미터로 넘어온 인가코드를 가져옴
  const [token, setToken] = useState(null);
  const {
    loading: isLoading,
    error: loginError,
    sendRequest: userlogin,
  } = useAsync(login, { onError: (error) => console.log(error) });

  useEffect(() => {
    if (!authCode) {
      return;
    }
    getKakaoToken(authCode)
      .then((response) => {
        console.log("카카오토큰", response); // 확인용
        setToken(response.data.access_token);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    userlogin(token)
      .then((response) => console.log("오똑토큰", response)) // 확인
      .catch((error) => console.error(error.response));
  }, [token]);

  return (
    <>
      {isLoading && <Loading />}
      {loginError && (
        <Modal
          title="로그인 실패"
          content="로그인에 실패하였습니다."
          onAction={{ text: "로그인 다시 하기", action: () => history.push("/login") }}
        />
      )}
    </>
  );
}

export default RedirectPage;
