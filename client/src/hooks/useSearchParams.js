import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useSearchParams = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = useCallback(
    (key, value, pathname = history.location.pathname) => {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
      history.push({
        pathname,
        search: searchParams.toString(),
      });
    },
    [history, searchParams],
  );

  return { searchParams, setSearchParams };
};

export default useSearchParams;
