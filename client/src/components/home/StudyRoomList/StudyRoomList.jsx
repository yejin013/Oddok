import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "@api/study-room-api";
import { Dropdown } from "@components/commons";
import { ArrowDown } from "@icons";
import { STUDY_FILTER_OPTIONS, STUDY_SORT_OPTIONS } from "@utils/constants/options";
import TabMenu from "../TabMenu/TabMenu";
import CardGrid from "../CardGrid/CardGrid";
import styles from "./StudyRoomList.module.css";

function StudyRoomList({ searchedTitle, searchedHashtag, showBookmark, tagFilter }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(undefined);
  const [filterOpt, setFilterOpt] = useState(undefined);
  const [sortOpt, setSortOpt] = useState(undefined);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loadedRooms, setLoadedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoomData = useCallback(async (page, sort, isPublic, category, name, hashtag) => {
    const rooms = await getStudyRoomList(page, sort, isPublic, category, name, hashtag);
    return rooms;
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const rooms = await fetchRoomData(undefined, sortOpt, filterOpt, currentCategory, searchedTitle, searchedHashtag);
      setLoadedRooms(rooms);
      setIsLoading(false);
    })();
    setCurrentPage(0);
  }, [fetchRoomData, sortOpt, filterOpt, currentCategory, searchedTitle, searchedHashtag]);

  const sortRoomHandler = (value) => {
    setSortOpt(value);
  };

  const filterRoomHandler = (value) => {
    setFilterOpt(value);
  };

  // 더보기
  const clickMoreBtn = async () => {
    setIsLoading(true);
    const rooms = await fetchRoomData(
      currentPage + 1,
      sortOpt,
      filterOpt,
      currentCategory,
      searchedTitle,
      searchedHashtag,
    );
    setIsLoading(false);
    // 더이상 가져올 데이터가 없으면 더보기 버튼을 없앤다
    if (rooms.length === 0) {
      setIsLastPage(true);
      return;
    }
    setLoadedRooms((prev) => [...prev, ...rooms]);
    setCurrentPage((prev) => prev + 1);
  };

  const isFiltered = (hashtags) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const e of [...tagFilter]) {
      if (!hashtags.includes(e)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.studyroom_head}>
        <div className={styles.tab_menu}>
          <TabMenu setCurrentCategory={setCurrentCategory} />
        </div>
        <div className={styles.filter}>
          <Dropdown options={STUDY_FILTER_OPTIONS} onSelect={filterRoomHandler} />
          <Dropdown options={STUDY_SORT_OPTIONS} onSelect={sortRoomHandler} />
        </div>
      </div>
      <div className={styles.studyroom_list}>
        <CardGrid //
          isLoading={isLoading}
          rooms={tagFilter?.size > 0 ? loadedRooms.filter((room) => isFiltered(room.hashtags)) : loadedRooms}
          showBookmark={showBookmark}
        />
      </div>
      {loadedRooms.length > 0 && !isLastPage && (
        <button className={styles.more_btn} type="button" onClick={clickMoreBtn}>
          <span>더보기</span>
          <div className={styles.icon}>
            <ArrowDown />
          </div>
        </button>
      )}
    </div>
  );
}

export default StudyRoomList;
