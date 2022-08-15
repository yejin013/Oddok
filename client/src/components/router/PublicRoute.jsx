import { userState } from "@recoil/user-state";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

function PublicRoute({ component: Component, restricted, ...rest }) {
  const user = useRecoilValue(userState);

  return <Route {...rest} render={() => (user.isLogin && restricted ? <Redirect to="/" /> : <Component />)} />;
}

export default PublicRoute;
