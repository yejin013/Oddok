import { useEffect } from "react";

function useInput(ref, callback, isDisabled) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  const pressEnter = (event) => {
    if (isDisabled) {
      return;
    }
    if (event.key === "Enter") {
      callback();
    }
  };

  return { pressEnter };
}

export default useInput;
