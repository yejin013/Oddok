import { userState } from "@recoil/user-state";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";

function PrivateRoute({ component: Component, ...rest }) {
  const user = useRecoilValue(userState);

  return <Route {...rest} render={() => (user.isLogin ? <Component /> : <Redirect to="/login" />)} />;
}

export default PrivateRoute;
