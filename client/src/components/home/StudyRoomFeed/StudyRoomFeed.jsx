import React, { useState, useEffect } from "react";
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

  const fetchStudyRoomlist = async (params, page, onSuccess) => {
    try {
      setLoading(true);
      const rooms = await getStudyRoomList(params, page);
      if (rooms.length < 16) setIsLastPage(true);
      onSuccess(rooms);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyRoomlist(searchParams, null, (rooms) => {
      setLoadedStudyRooms(rooms);
      setNextPage(1);
    });
  }, [searchParams]);

  const clickMoreBtn = () => {
    fetchStudyRoomlist(searchParams, nextPage, (rooms) => {
      setLoadedStudyRooms((prev) => [...prev, ...rooms]);
      setNextPage((prev) => prev + 1);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TabMenu
          defaultValue={searchParams.get("category")}
          setCurrentCategory={(value) => setSearchParams("category", value)}
        />
        <div className={styles.filters}>
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
      <FeedGrid
        isLoading={loading}
        rooms={
          tagFilter?.size > 0
            ? loadedStudyRooms.filter(({ hashtags }) => hashtags.some((e) => [...tagFilter].includes(e)))
            : loadedStudyRooms
        }
      />
      {loadedStudyRooms.length > 0 && !isLastPage && (
        <div className={styles.footer}>
          <button type="button" onClick={clickMoreBtn}>
            <span>더보기</span>
            <div className={styles.icon}>
              <ArrowDown />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyRoomList;
