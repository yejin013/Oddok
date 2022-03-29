import React, { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user_state";
// import { getTestUser } from "../api/getTestUser";

/**
 * api 요청시 헤더에 userId 넣기 위한 테스트용 로직
 *  - 랜덤 아이디 생성해서 localStorage에 저장 -> axios 인스턴스 생성시 가져와서 사용
 *  - userState 아톰에 userId 저장
 */
function Test() {
  const [userInfo, setUser] = useRecoilState(userState);

  useEffect(() => {
    const randomId = `user${Math.floor(Math.random() * 100000000)}`;
    localStorage.setItem("userId", randomId);
    console.log("HI👋 ", localStorage.getItem("userId"), "✨");
    setUser({ ...userInfo, userId: localStorage.getItem("userId") });
  }, []);

  return <div style={{ color: "white" }}>{userInfo.userId}</div>;
}

export default Test;
