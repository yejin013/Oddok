import React, { useReducer, useEffect, useCallback } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, data: null, error: null };
    case "SUCCESS":
      return { loading: false, data: action.data, error: null };
    case "ERROR":
      return { loading: false, data: null, error: action.error };
    default:
      return { loading: false, data: null, error: null };
  }
};

/**
 * API 요청시 요청 상태를 관리하는 커스텀 Hook
 * @param {callback} callback
 * @param {boolean} skip
 * @returns loading, data, error, sendRequest
 * - loading, error 상태 처리 가능
 * - skip을 false로 지정시 자동 호출 (get 요청시 사용)
 * - sendRequest 직접 호출 가능
 */
function useAsync(callback, deps = [], skip = true) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    // eslint-disable-next-line consistent-return
    async (...args) => {
      dispatch({ type: "LOADING" });
      try {
        const data = await callback(...args);
        dispatch({ type: "SUCCESS", data });
        return data;
      } catch (error) {
        console.error(error);
        dispatch({ type: "ERROR", error });
      }
    },
    [callback],
  );

  useEffect(() => {
    if (skip) return;
    sendRequest();
  }, deps);

  return { ...state, sendRequest };
}

export default useAsync;
