import React, { useState, useEffect, useCallback } from "react";
import { HashtagButton } from "@components/commons";
import { Plus } from "@icons";
import { HASHTAG_OPTIONS } from "@utils/constants/options";
import InputButton from "../InputButton/InputButton";
import styles from "./HashtagForm.module.css";

function HashtagForm({ hashtags, setHashtags }) {
  const [selectedHashtags, setSelectedHashtags] = useState(hashtags.filter((e) => HASHTAG_OPTIONS.includes(e)));
  const [userHashtags, setUserHashtags] = useState(hashtags.filter((e) => !HASHTAG_OPTIONS.includes(e)));
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setHashtags([...selectedHashtags, ...userHashtags]);
  }, [selectedHashtags, userHashtags, setHashtags]);

  const selectHashtag = useCallback((e) => {
    if (e.target.checked) setSelectedHashtags((prev) => Array.from(new Set(prev).add(e.target.value)));
    else
      setSelectedHashtags((prev) => {
        const next = new Set(prev);
        next.delete(e.target.value);
        return Array.from(next);
      });
  }, []);

  const deleteUserHashtag = useCallback((value) => {
    setUserHashtags((prev) => prev.filter((e) => e !== value));
  }, []);

  const addUserHashtag = (value) => {
    if (userHashtags.includes(value) || HASHTAG_OPTIONS.includes(value)) return;
    setUserHashtags((prev) => [...prev, value]);
  };

  return (
    <>
      <p className={styles.label}>해시태그</p>
      <div className={styles.hashtag_item}>
        {HASHTAG_OPTIONS.map((label) => (
          <HashtagButton
            key={label}
            label={label}
            onToggle={selectHashtag}
            checked={selectedHashtags.includes(label)}
          />
        ))}
        {userHashtags.map((label) => (
          <HashtagButton key={label} label={label} onDelete={() => deleteUserHashtag(label)} checked />
        ))}
        {isTyping && (
          <InputButton
            onSubmit={(label) => {
              addUserHashtag(label);
              setIsTyping(false);
            }}
            onDelete={() => setIsTyping(false)}
          />
        )}
        <button type="button" className={styles.add_button} onClick={() => setIsTyping(true)}>
          <Plus />
        </button>
      </div>
    </>
  );
}

export default HashtagForm;
