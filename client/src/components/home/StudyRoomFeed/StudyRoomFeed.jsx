import React, { useState, useEffect, useCallback } from "react";
import { getStudyRoomList } from "@api/study-room-api";
import { Dropdown } from "@components/commons";
import { TabMenu, FeedGrid } from "@components/home";
import { ArrowDown } from "@icons";
import { useSearchParams } from "@hooks";
import { STUDY_FILTER_OPTIONS, STUDY_SORT_OPTIONS } from "@utils/constants/options";
import styles from "./StudyRoomFeed.module.css";

function StudyRoomList({ tagFilter }) {
  const { searchParams, setSearchParams } = useSearchParams();
  const [loadedStudyRooms, setLoadedStudyRooms] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStudyRoomlist = useCallback(async (params, page, onSuccess) => {
    try {
      setLoading(true);
      const rooms = await getStudyRoomList(params, page);
      if (rooms.length < 16) setIsLastPage(true);
      onSuccess(rooms);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchStudyRoomlist(searchParams, null, (rooms) => {
      setLoadedStudyRooms(rooms);
      setNextPage(1);
    });
  }, [searchParams, fetchStudyRoomlist]);

  const clickMoreBtn = () => {
    fetchStudyRoomlist(searchParams, nextPage, (rooms) => {
      setLoadedStudyRooms((prev) => [...prev, ...rooms]);
      setNextPage((prev) => prev + 1);
    });
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
          <TabMenu
            defaultValue={searchParams.get("category")}
            setCurrentCategory={(value) => setSearchParams("category", value)}
          />
        </div>
        <div className={styles.filter}>
          <Dropdown
            options={STUDY_FILTER_OPTIONS}
            defaultValue={searchParams.get("isPublic")}
            onSelect={(value) => setSearchParams("isPublic", value)}
          />
          <Dropdown
            options={STUDY_SORT_OPTIONS}
            defaultValue={searchParams.get("sort")}
            onSelect={(value) => setSearchParams("sort", value)}
          />
        </div>
      </div>
      <div className={styles.studyroom_list}>
        <FeedGrid
          isLoading={loading}
          rooms={tagFilter?.size > 0 ? loadedStudyRooms.filter((room) => isFiltered(room.hashtags)) : loadedStudyRooms}
        />
      </div>
      {loadedStudyRooms.length > 0 && !isLastPage && (
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
