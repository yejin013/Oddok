import React, { useState, useRef, useEffect } from "react";
import { ArrowDown } from "@icons";
import styles from "./Dropdown.module.css";

function Dropdown({ options, onSelect, defaultValue }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(defaultValue);
  const insideRef = useRef();

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const clickOption = (label, value) => {
    setSelectedOpt(label);
    onSelect(value);
    setIsActive(false);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (isActive && insideRef.current && !insideRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isActive]);

  return (
    <div ref={insideRef} className={styles.container}>
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

export default Dropdown;
