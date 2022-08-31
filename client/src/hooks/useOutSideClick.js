import { useEffect } from "react";

function useOutSideClick(ref, callback) {
  useEffect(() => {
    const onOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", onOutsideClick);

    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [ref, callback]);
}

export default useOutSideClick;
