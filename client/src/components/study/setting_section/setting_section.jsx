import React, { useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user_state";
import { roomInfoState } from "../../../recoil/studyroom_state";
import RadioButton from "../../commons/radio_button/radio_button";
import ToggleButton from "../../commons/toggle_button/toggle_button";
import AddButton from "../../commons/add_button/add_button";
import Dropdown from "../../commons/dropdown/dropdown";
import Input from "../../commons/Input/input";
import Textarea from "../../commons/textarea/textarea";

import { ReactComponent as Video } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import { ReactComponent as Hashtag } from "../../../assets/icons/hashtag.svg";

import styles from "./setting_section.module.css";

const categories = ["공무원 준비", "수능/내신 준비", "자격증 준비", "취업 준비", "개인 학습", "일반"];
const hashtags = ["교시제", "여성전용", "아침기상", "컨셉", "목표시간", "자율", "평일", "주말", "예치금", "인증"];
const targetTimeOptions = [
  { value: 10, name: "10시간" },
  { value: 9, name: "9시간" },
  { value: 8, name: "8시간" },
];
const userLimitOptions = [
  { value: 4, name: "4명" },
  { value: 3, name: "3명" },
  { value: 2, name: "2명" },
];

/**
 * TODO
 * 1. 기존 방 정보 가져와서 보여주기
 * 2. 해시태그 set을 array로
 * 3. 카메라 마이크 토글시 ON/OFF랑 아이콘 변경
 * 4. 필수항목 입력 안했을 경우 처리 (input은 invalid & focus???)
 * 5. input validation check (이모지같은거 사용 제한?)
 * 6. Fix: 드롭다운 선택시 단위 안보여짐 (시간, 명)
 * 7. textarea 글자수 제한
 */
/**
 *
 * 8. 방정보 입력안했을때 방정보를 수정해주세요 뜨게. 설정하면 xxx n호실 이렇게
 * 9. 목표 클릭하고 스터디명 input 클릭시 정보 지워지게
 */

function SettingSection({ clickSettingBtn }) {
  // 수정 권한에 따라 disabled 처리
  const userInfo = useRecoilValue(userState);
  const [disabled, setDisabled] = useState(!userInfo.updateAllowed);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const titleRef = useRef();
  const [hashtag, setHashtag] = useState([]);
  const passwordInputRef = useRef();
  const bgmlinkInputRef = useRef();
  const ruleInputRef = useRef();

  // for validation
  const [isCategoryValid, setIsCategoryValid] = useState(false);

  const [isClickedDetail, setIsClickedDetail] = useState(false);

  const clickDetailBtn = () => {
    setIsClickedDetail((prev) => !prev);
  };

  const clickSaveBtn = () => {
    // TODO 필수 항목 입력 안했을 경우 처리
    let { name } = roomInfo;
    if (titleRef.current.value) {
      console.log(titleRef.current.value);
      name = titleRef.current.value;
    }
    console.log(name);
    setRoomInfo({
      ...roomInfo,
      name,
      hashtags: hashtag,
      isPublic: !passwordInputRef.current.value,
      password: passwordInputRef.current.value,
      bgmlink: bgmlinkInputRef.current.value,
      rule: ruleInputRef.current.value,
    });
    clickSettingBtn();
  };

  const categoryHandler = (e) => {
    setIsCategoryValid(true);
    setRoomInfo({ ...roomInfo, name: `${e.target.value} n호실`, category: e.target.value });
  };

  const hashtagHandler = (e) => {
    const checkedHashtag = new Set(hashtag);
    if (e.target.checked && !checkedHashtag.has(e.target.value)) {
      checkedHashtag.add(e.target.value);
    } else if (!e.target.checked && checkedHashtag.has(e.target.value)) {
      checkedHashtag.delete(e.target.value);
    }
    setHashtag(checkedHashtag);
  };

  const audioRuleHandler = (e) => {
    if (e.target.checked && !roomInfo.isMicOn) {
      setRoomInfo({ ...roomInfo, isMicOn: e.target.checked });
    } else if (!e.target.checked && roomInfo.isMicOn) {
      setRoomInfo({ ...roomInfo, isMicOn: e.target.checked });
    }
  };

  const videoRuleHandler = (e) => {
    if (e.target.checked && !roomInfo.isCamOn) {
      setRoomInfo({ ...roomInfo, isCamOn: e.target.checked });
    } else if (!e.target.checked && roomInfo.isCamOn) {
      setRoomInfo({ ...roomInfo, isCamOn: e.target.checked });
    }
  };

  const targetTimeHandler = (value) => {
    setRoomInfo({ ...roomInfo, targetTime: value });
  };

  const userLimitHandler = (value) => {
    setRoomInfo({ ...roomInfo, userLimit: value });
  };

  return (
    <section className={styles.container}>
      <div className={styles.roominfo_item}>
        <p className={styles.lg_label}>스터디 목표는 무엇인가요?</p>
        <p className={styles.sub_label}>목표를 설정하면 방을 빠르고 쉽게 설정할 수 있어요.</p>
        <div className={styles.category}>
          {categories.map((c) => (
            <div className={styles.category_item}>
              <RadioButton label={c} group="category" onChange={categoryHandler} disabled={disabled} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.roominfo_item}>
        <p className={styles.label}>스터디 명</p>
        <Input
          placeholder={roomInfo.name || "목표를 설정하거나, 직접 입력해주세요"}
          ref={titleRef}
          disabled={disabled}
        />
      </div>
      <div className={styles.box}>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>장치 규칙</p>
          <div className={styles.content}>
            <ToggleButton icon={<Video />} label="카메라 ON" onToggle={videoRuleHandler} disabled={disabled} />
            <ToggleButton icon={<MicOff />} label="마이크 OFF" onToggle={audioRuleHandler} disabled={disabled} />
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>해시태그</p>
          <div className={styles.content}>
            {hashtags.map((item) => (
              <ToggleButton icon={<Hashtag />} label={item} onToggle={hashtagHandler} disabled={disabled} />
            ))}
            <AddButton />
          </div>
        </div>
      </div>
      <div className={styles.detail_button}>
        <button type="button" onClick={clickDetailBtn}>
          세부설정▼
        </button>
      </div>
      <div className={isClickedDetail ? styles.detail_clicked : styles.detail}>
        <div className={styles.detail_box}>
          <div>
            <p className={styles.label}>스터디 이미지</p>
            <div className={styles.image_box}>
              <img src="https://image.istarbucks.co.kr/common/img/main/rewards-logo.png" alt="대표 이미지" />
            </div>
          </div>
          <div>
            <p className={styles.label}>목표시간</p>
            <Dropdown options={targetTimeOptions} onSelect={targetTimeHandler} disabled={disabled} />
            <p className={styles.label}>인원 수</p>
            <Dropdown options={userLimitOptions} onSelect={userLimitHandler} disabled={disabled} />
            <p className={styles.label}>비밀번호</p>
            <Input type="password" placeholder="없음" ref={passwordInputRef} disabled={disabled} />
            <p className={styles.label}>노래</p>
            <Input placeholder="유튜브 링크를 입력해주시오!" ref={bgmlinkInputRef} disabled={disabled} />
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 규칙</p>
          <Textarea placeholder="스터디 규칙은 여기에 작성해주세요(임시)" ref={ruleInputRef} disabled={disabled} />
        </div>
      </div>
      {userInfo.updateAllowed && (
        <div className={styles.save_button}>
          <button type="button" onClick={clickSaveBtn}>
            설정완료
          </button>
        </div>
      )}
    </section>
  );
}

export default SettingSection;
