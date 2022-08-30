import React, { useState, useRef } from "react";
import { ArrowDown } from "@icons";
import useOutSideClick from "@hooks/useOutSideClick";
import styles from "./Dropdown.module.css";

function Dropdown({ options, onSelect, defaultValue }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(defaultValue);
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsActive(false));

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const clickOption = (label, value) => {
    setSelectedOpt(label);
    onSelect(value);
    setIsActive(false);
  };

  return (
    <div ref={dropdownRef} className={styles.container}>
      <div className={styles.select} onClick={toggleMenu}>
        <p className={styles.selected_opt}>{selectedOpt || options[0].label}</p>
        <div className={styles.icon}>
          <ArrowDown />
        </div>
      </div>
      <ul className={`${isActive ? styles.active : ""}`}>
        {options.map((option) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li key={option.value} className={styles.opt} onClick={() => clickOption(option.label, option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Dropdown);
