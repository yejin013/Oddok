/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import styles from "./dropdown.module.css";

function Dropdown({ options, onSelect }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState();

  const toggleMenu = (e) => {
    setIsActive(!isActive);
  };

  const clickOptionHandler = (value) => {
    setSelectedOpt(value);
    onSelect(value);
    setIsActive(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.select} onClick={toggleMenu}>
        <p className={styles.selected_opt}>{selectedOpt || options[0].name}</p>
      </div>
      {isActive && (
        <ul>
          {options.map((option) => (
            <li key={option.value} className={styles.opt} onClick={() => clickOptionHandler(option.name)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
