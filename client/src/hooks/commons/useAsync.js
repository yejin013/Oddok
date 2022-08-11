import { useState, useEffect, useCallback } from "react";

function useAsync({ requestFn, deps = [], skip = true, onSuccess, onError }) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const request = useCallback(
    async (...args) => {
      setState({ loading: true, data: null, error: null });
      try {
        const data = await requestFn(...args);
        onSuccess?.(data);
        setState({ loading: false, data, error: null });
      } catch (error) {
        onError?.(error);
        setState({ loading: false, data: null, error });
      }
    },
    [requestFn],
  );

  const reset = () => {
    setState({ loading: false, data: null, error: null });
  };

  useEffect(() => {
    if (!skip) {
      request();
    }
  }, deps);

  return { ...state, request, reset };
}

export default useAsync;
