import React, { useState, useRef } from "react";
import { ArrowDown } from "@icons";
import useOutSideClick from "@hooks/useOutSideClick";
import styles from "./Dropdown.module.css";

function Dropdown({ options, onSelect, defaultValue }) {
  const [isActive, setIsActive] = useState(false);
  const [current, setCurrent] = useState(options.find(({ value }) => value === defaultValue)?.label);
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsActive(false));

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const clickOption = (option) => {
    const { value, label } = option;
    onSelect(value);
    setCurrent(label);
    setIsActive(false);
  };

  return (
    <div ref={dropdownRef} className={styles.container}>
      <div className={styles.select} onClick={toggleMenu}>
        <div className={styles.selected_opt}>{current}</div>
        <div className={styles.icon}>
          <ArrowDown />
        </div>
      </div>
      <ul className={isActive ? styles.active : ""}>
        {options.map((option) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li key={option.value} className={styles.opt} onClick={() => clickOption(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Dropdown);
