import React, { useState, useRef } from "react";
import RadioButton from "../../commons/radio_button/radio_button";
import ToggleButton from "../../commons/toggle_button/toggle_button";
import AddButton from "../../commons/add_button/add_button";
import Dropdown from "../../commons/dropdown/dropdown";
import Input from "../../commons/Input/input";

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

function SettingSection({ clickSettingBtn, onSave }) {
  const [category, setCategory] = useState();
  const [hashtag, setCheckedHashtag] = useState(new Set());
  const [audioRule, setAudioRule] = useState(false);
  const [videoRule, setVideoRule] = useState(false);
  const [targetTime, setTargetTime] = useState();
  const [userLimit, setUserLimit] = useState();
  const passwordInputRef = useRef();
  const bgmlinkInputRef = useRef();
  const ruleInputRef = useRef();

  const [isClickedDetail, setIsClickedDetail] = useState(false);

  const clickDetailBtn = () => {
    setIsClickedDetail((prev) => !prev);
  };

  const clickSaveBtn = () => {
    clickSettingBtn();
    onSave({
      category,
      hashtag,
      audioRule,
      videoRule,
      targetTime,
      userLimit,
      isPublic: !passwordInputRef.current.value,
      password: passwordInputRef.current.value,
      bgmlink: bgmlinkInputRef.current.value,
      rule: ruleInputRef.current.value,
    });
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const hashtagHandler = (e) => {
    const checkedHashtag = new Set(hashtag);
    if (e.target.checked && !checkedHashtag.has(e.target.value)) {
      checkedHashtag.add(e.target.value);
      setCheckedHashtag(checkedHashtag);
    } else if (!e.target.checked && checkedHashtag.has(e.target.value)) {
      checkedHashtag.delete(e.target.value);
      setCheckedHashtag(checkedHashtag);
    }
  };

  const audioRuleHandler = (e) => {
    if (e.target.checked && !audioRule) {
      setAudioRule(true);
    } else if (!e.target.checked && audioRule) {
      setAudioRule(false);
    }
  };

  const videoRuleHandler = (e) => {
    if (e.target.checked && !videoRule) {
      setVideoRule(true);
    } else if (!e.target.checked && videoRule) {
      setVideoRule(false);
    }
  };

  const targetTimeHandler = (value) => {
    setTargetTime(value);
  };

  const userLimitHandler = (value) => {
    setUserLimit(value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.roominfo_item}>
        <p className={styles.lg_label}>스터디 목표는 무엇인가요?</p>
        <p className={styles.sub_label}>목표를 설정하면 방을 빠르고 쉽게 설정할 수 있어요.</p>
        <div className={styles.category}>
          {categories.map((c) => (
            <div className={styles.category_item}>
              <RadioButton label={c} group="category" onChange={categoryHandler} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.roominfo_item}>
        <p className={styles.label}>스터디 명</p>
        <div className={styles.title}>{category} 1호실</div>
      </div>
      <div className={styles.box}>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>장치 규칙</p>
          <div className={styles.content}>
            <ToggleButton icon={<Video />} label="카메라 ON" onToggle={videoRuleHandler} />
            <ToggleButton icon={<MicOff />} label="마이크 OFF" onToggle={audioRuleHandler} />
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>해시태그</p>
          <div className={styles.content}>
            {hashtags.map((item) => (
              <ToggleButton icon={<Hashtag />} label={item} onToggle={hashtagHandler} />
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
            <Dropdown options={targetTimeOptions} onSelect={targetTimeHandler} />
            <p className={styles.label}>인원 수</p>
            <Dropdown options={userLimitOptions} onSelect={userLimitHandler} />
            <p className={styles.label}>비밀번호</p>
            <Input placeholder="없음" ref={passwordInputRef} />
            <p className={styles.label}>노래</p>
            <Input placeholder="유튜브 링크를 입력해주시오!" ref={bgmlinkInputRef} />
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 규칙</p>
          <Input placeholder="스터디 규칙은 여기에 작성해주세요(임시)" ref={ruleInputRef} />
        </div>
      </div>
      <div className={styles.save_button}>
        <button type="button" onClick={clickSaveBtn}>
          설정완료
        </button>
      </div>
    </section>
  );
}

export default SettingSection;
