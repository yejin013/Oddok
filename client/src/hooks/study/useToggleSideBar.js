import { useState } from "react";

const useToggleSideBar = () => {
  const [sideBarType, setSideBarType] = useState();

  const toggleSideBar = (type) => {
    setSideBarType((prev) => (prev === type ? null : type));
  };

  return { sideBarType, toggleSideBar };
};

export default useToggleSideBar;
