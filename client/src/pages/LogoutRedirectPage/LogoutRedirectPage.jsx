import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "@recoil/user-state";
import { errorState } from "@recoil/error-state";
import useAsync from "@hooks/useAsync";
import { logout } from "@api/auth/auth-api";
import { Loading } from "@components/commons";

function LogoutRedirectPage() {
  const [user, setUserState] = useRecoilState(userState);
  const setError = useSetRecoilState(errorState);

  const { loading: isLoading } = useAsync({
    requestFn: logout,
    skip: false,
    onSuccess: () => {
      localStorage.setItem("isLogin", false);
      setUserState({ ...user, isLogin: JSON.parse(localStorage.getItem("isLogin")) });
    },
    onError: (error) => setError(error),
  });

  return <div>{isLoading && <Loading />}</div>;
}

export default LogoutRedirectPage;
