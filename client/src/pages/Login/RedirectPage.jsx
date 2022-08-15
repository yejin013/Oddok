import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { errorState } from "@recoil/error-state";
import useAsync from "@hooks/useAsync";
import { login } from "@api/auth/auth-api";
import { Loading } from "@components/commons";

function RedirectPage() {
  const authCode = new URL(window.location.href).searchParams.get("code"); // 파라미터로 넘어온 인가코드를 가져옴
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  const { loading: isLoading } = useAsync({
    requestFn: () => login(authCode),
    skip: false,
    onSuccess: () => {
      localStorage.setItem("isLogin", true);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: (error) => setError(error),
  });

  return <div>{isLoading && <Loading />}</div>;
}

export default RedirectPage;
