import { useState, useEffect, useCallback } from "react";

function useFetch(requestFn) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  });

  const request = useCallback(
    // eslint-disable-next-line consistent-return
    async (...args) => {
      setState({ loading: true, data: null, error: null });
      try {
        const data = await requestFn(...args);
        setState({ loading: false, data, error: null });
        return data;
      } catch (error) {
        console.error(error.response);
        setState({ loading: false, data: null, error: error.response });
      }
    },
    [requestFn],
  );

  useEffect(() => {
    request();
  }, []);

  return { ...state, request };
}

export default useFetch;
