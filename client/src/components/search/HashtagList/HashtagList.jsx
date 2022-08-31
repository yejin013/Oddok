import React, { useState, useEffect } from "react";
import { getPopluarHashtag } from "@api/hashtag-api";
import { HashtagButton } from "@components/commons";
import { useSearchParams } from "@hooks";
import styles from "./HashtagList.module.css";

function HashtagList({ onToggle }) {
  const { searchParams } = useSearchParams();
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const param = searchParams.get("title");
    getPopluarHashtag(param)
      .then((response) => setHashtags(response.data.hashtags))
      .catch((e) => console.error(e));
  }, [searchParams]);

  return (
    <div className={styles.hashtag_list}>
      {hashtags.map((label) => (
        <HashtagButton key={label} label={label} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default HashtagList;
