import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomInfoState, roomTitleState } from "@recoil/studyroom-state";
import {
  RadioButton,
  HashtagButton,
  ToggleButton,
  InputButton,
  AddButton,
  Dropdown,
  Input,
  Textarea,
} from "@components/commons";
import { VideoOn, MicOff } from "@icons";
import Image from "./image";
import styles from "./SettingSection.module.css";

const CATEGORIES = [
  { value: "OFFICIAL", label: "공무원 준비" },
  { value: "SCHOOL", label: "수능/내신 준비" },
  { value: "CERTIFICATE", label: "자격증 준비" },
  { value: "EMPLOYEE", label: "취업 준비" },
  { value: "PERSONAL", label: "개인 학습" },
  { value: "ETC", label: "일반" },
];
const HASHTAGS = ["교시제", "여성전용", "아침기상", "컨셉", "목표시간", "자율", "평일", "주말", "예치금", "인증"];
const USERLIMIT_OPTIONS = [
  { value: 6, name: "6명" },
  { value: 5, name: "5명" },
  { value: 4, name: "4명" },
  { value: 3, name: "3명" },
  { value: 2, name: "2명" },
  { value: 1, name: "1명" },
];
const TARGETTIME_OPTIONS = [
  { value: 10, name: "10시간" },
  { value: 9, name: "9시간" },
  { value: 8, name: "8시간" },
];
const ENDDATE_OPTIONS = [
  { value: new Date(new Date(2022, 11, 32) + 3240 * 10000).toISOString().split("T")[0], name: "2022.12.31" },
];

function SettingForm({ roomData, onClose, onUpdate }) {
  const [roomInfoAtom, setRoomInfoAtom] = useRecoilState(roomInfoState);
  const [roomInfo, setRoomInfo] = useState(roomData || roomInfoAtom);
  const roomTitle = useRecoilValue(roomTitleState);
  const titleRef = useRef();
  const [hashtags, setHashtags] = useState(new Set());
  const [newHashtags, setNewHashtags] = useState([]);
  const passwordInputRef = useRef();
  const bgmlinkInputRef = useRef();
  const ruleInputRef = useRef();

  useEffect(() => {
    titleRef.current.value = roomInfo.name;
    passwordInputRef.current.value = roomInfo.password ? roomInfo.password : "";
    bgmlinkInputRef.current.value = roomInfo.bgmlink ? roomInfo.bgmlink : "";
    ruleInputRef.current.value = roomInfo.rule ? roomInfo.rule : "";
    if (roomInfo.hashtags.length) {
      const set = new Set(HASHTAGS);
      setHashtags(new Set(roomInfo.hashtags.filter((e) => set.has(e)))); // set
      setNewHashtags(roomInfo.hashtags.filter((e) => !set.has(e))); // array
    }
  }, []);

  // 필수 항목 입력 확인
  const [isCategorySelected, setIsCategorySelected] = useState(roomInfo.category);
  const [isUserLimitSelected, setIsUserLimitSelected] = useState(roomInfo.limitUsers);

  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [isClickedDetail, setIsClickedDetail] = useState(false);
  const [isHashtagInput, setIsHashtagInput] = useState(false);

  const clickDetailBtn = () => {
    setIsClickedDetail((prev) => !prev);
  };

  const clickSaveBtn = () => {
    const data = {
      ...roomInfo,
      name: titleRef.current.value
        ? titleRef.current.value.replace(/[\u{1F004}-\u{1F9E6}]|[\u{1F600}-\u{1F9D0}]/gu, "")
        : "",
      hashtags: Array.from(hashtags).concat(newHashtags), // hashtag set to array
      isPublic: !passwordInputRef.current.value,
      password: passwordInputRef.current.value,
      bgmlink: bgmlinkInputRef.current.value,
      rule: ruleInputRef.current.value,
    };
    // 방 정보 수정
    if (onUpdate) {
      onUpdate(data);
      onClose();
      return;
    }
    // 스터디룸 생성시 입력한 방 정보 저장
    setRoomInfoAtom(data);
    onClose();
  };

  const categoryHandler = (value) => {
    setIsCategorySelected(true);
    setRoomInfo((prev) => ({ ...prev, category: value }));
  };

  const userLimitHandler = (value) => {
    setIsUserLimitSelected(true);
    setRoomInfo((prev) => ({ ...prev, limitUsers: value }));
  };

  const hashtagHandler = (e) => {
    const checkedHashtag = new Set(hashtags);
    if (e.target.checked) checkedHashtag.add(e.target.value);
    else if (!e.target.checked) checkedHashtag.delete(e.target.value);
    setHashtags(checkedHashtag);
  };

  const addHashtagInputHandler = () => {
    setIsHashtagInput(true);
  };

  const deleteHashtagInputHandler = () => {
    setIsHashtagInput(false);
  };

  const newHashtagHandler = (label) => {
    setIsHashtagInput(false);
    const userInput = new Set(newHashtags);
    userInput.add(label);
    setNewHashtags(Array.from(userInput));
  };

  const deleteHandler = (label) => {
    setNewHashtags((prev) => prev.filter((item) => item !== label));
  };

  const targetTimeHandler = (value) => {
    setRoomInfo((prev) => ({ ...prev, targetTime: value }));
  };

  const endDateHandler = (value) => {
    setRoomInfo((prev) => ({ ...prev, endAt: value }));
  };

  // 비밀번호 입력시 숫자인지 체크
  // 아닐 경우 invalid 처리
  const validPasswordHandler = () => {
    const check = /^[0-9]+$/;
    if (passwordInputRef.current.value && !check.test(passwordInputRef.current.value)) {
      setIsInvalidPassword(true);
      return;
    }
    setIsInvalidPassword(false);
  };

  const videoRuleHandler = (e) => {
    setRoomInfo((prev) => ({ ...prev, isCamOn: e.target.checked }));
  };

  const audioRuleHandler = (e) => {
    setRoomInfo((prev) => ({ ...prev, isMicOn: e.target.checked }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.default_box}>
        <div className={styles.roominfo_item}>
          <p className={styles.heading}>스터디 목표는 무엇인가요?</p>
          <p className={styles.sub_heading}>목표를 설정하면 방을 빠르고 쉽게 설정할 수 있어요.</p>
          <div className={styles.category}>
            {CATEGORIES.map((c) => (
              <div key={c.value} className={styles.category_item}>
                <RadioButton
                  label={c.label}
                  group="category"
                  onChange={() => {
                    categoryHandler(c.value);
                  }}
                  checked={c.value === roomInfo.category}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 명 *</p>
          <Input placeholder={roomTitle || "목표를 설정하거나, 직접 입력해주세요"} ref={titleRef} />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>인원 수 *</p>
          <Dropdown options={USERLIMIT_OPTIONS} onSelect={userLimitHandler} defaultValue={`${roomInfo.limitUsers}명`} />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>해시태그</p>
          <div className={styles.hashtag_item}>
            {HASHTAGS.map((label) => (
              <HashtagButton label={label} onToggle={hashtagHandler} checked={hashtags.has(label)} />
            ))}
            {newHashtags.map((label) => (
              <HashtagButton label={label} onDelete={() => deleteHandler(label)} checked />
            ))}
            {isHashtagInput && (
              <InputButton onSubmit={(label) => newHashtagHandler(label)} onDelete={deleteHashtagInputHandler} />
            )}
            <AddButton onClick={addHashtagInputHandler} />
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
              <Image />
            </div>
          </div>
          <div>
            <div>
              <p className={styles.label}>목표시간</p>
              <Dropdown
                options={TARGETTIME_OPTIONS}
                onSelect={targetTimeHandler}
                defaultValue={`${roomInfo.targetTime}시간`}
              />
            </div>
            <div>
              <p className={styles.label}> 스터디 기간</p>
              <Dropdown options={ENDDATE_OPTIONS} onSelect={endDateHandler} defaultValue={roomInfo.endAt} />
            </div>
            <div>
              <p className={styles.label}>비밀번호</p>
              <Input
                placeholder="숫자 4자리 비밀번호를 설정하세요"
                ref={passwordInputRef}
                maxLength="4"
                onChange={validPasswordHandler}
                isInvalid={isInvalidPassword}
              />
              <p className={`${styles.invalid_message} ${isInvalidPassword ? "" : styles.hide}`}>
                비밀번호는 숫자 4자리 입니다.
              </p>
            </div>
            <div>
              <p className={styles.label}>장치 규칙</p>
              <div className={styles.device_item}>
                <ToggleButton
                  icon={<VideoOn />}
                  label="카메라 ON"
                  onToggle={videoRuleHandler}
                  checked={roomInfo.isCamOn}
                />
                <ToggleButton
                  icon={<MicOff />}
                  label="마이크 OFF"
                  onToggle={audioRuleHandler}
                  checked={roomInfo.isMicOn}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>노래</p>
          <Input placeholder="유튜브 링크를 입력해주세요." ref={bgmlinkInputRef} />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 규칙</p>
          <Textarea placeholder="스터디 규칙은 여기에 작성해주세요." ref={ruleInputRef} />
        </div>
      </div>
      <div className={styles.save_button}>
        <button
          type="button"
          onClick={clickSaveBtn}
          disabled={!(isCategorySelected && isUserLimitSelected && !isInvalidPassword)}
        >
          확인
        </button>
      </div>
    </section>
  );
}

export default SettingForm;
