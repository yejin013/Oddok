import React, { useState } from "react";
import { ArrowDown } from "@icons";
import styles from "./Dropdown.module.css";

function Dropdown({ options, onSelect, defaultValue }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(defaultValue);

  const toggleMenu = (e) => {
    setIsActive(!isActive);
  };

  const clickOptionHandler = (name, value) => {
    setSelectedOpt(name);
    onSelect(value);
    setIsActive(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.select} onClick={toggleMenu}>
        <p className={styles.selected_opt}>{selectedOpt || options[0].name}</p>
        <div className={styles.icon}>
          <ArrowDown />
        </div>
      </div>
      <ul className={`${isActive ? styles.active : ""}`}>
        {options.map((option) => (
          <li key={option.value} className={styles.opt} onClick={() => clickOptionHandler(option.name, option.value)}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
