import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/user_state";
import { roomInfoState } from "../../../recoil/studyroom_state";
import RadioButton from "../../commons/radio_button/radio_button";
import HashtagButton from "../../commons/hashtag_button/hashtag_button";
import ToggleButton from "../../commons/toggle_button/toggle_button";
import InputButton from "../../commons/input_button/input_button";
import AddButton from "../../commons/add_button/add_button";
import Dropdown from "../../commons/dropdown/dropdown";
import Input from "../../commons/Input/input";
import Textarea from "../../commons/textarea/textarea";

import { ReactComponent as Video } from "../../../assets/icons/video.svg";
import { ReactComponent as MicOff } from "../../../assets/icons/mic_off.svg";
import Image from "./image";

import styles from "./setting_section.module.css";

const categories = [
  { value: "OFFICIAL", name: "공무원 준비" },
  { value: "SCHOOL", name: "수능/내신 준비" },
  { value: "CERTIFICATE", name: "자격증 준비" },
  { value: "EMPLOYEE", name: "취업 준비" },
  { value: "PERSONAL", name: "개인 학습" },
  { value: "ETC", name: "일반" },
];
const hashtags = ["교시제", "여성전용", "아침기상", "컨셉", "목표시간", "자율", "평일", "주말", "예치금", "인증"];
const userLimitOptions = [
  { value: 6, name: "6명" },
  { value: 5, name: "5명" },
  { value: 4, name: "4명" },
  { value: 3, name: "3명" },
  { value: 2, name: "2명" },
  { value: 1, name: "1명" },
];
const targetTimeOptions = [
  { value: 10, name: "10시간" },
  { value: 9, name: "9시간" },
  { value: 8, name: "8시간" },
];
const periodOptions = [{ value: new Date(2022, 11, 31).toISOString(), name: "2022.12.31" }];

function SettingSection({ clickSettingBtn }) {
  // 수정 권한에 따라 disabled 처리
  const userInfo = useRecoilValue(userState);
  const [disabled, setDisabled] = useState(!userInfo.updateAllowed);
  const [roomInfo, setRoomInfo] = useRecoilState(roomInfoState);

  const titleRef = useRef();
  const [hashtag, setHashtag] = useState([]);
  const [newHashtag, setNewHashtag] = useState([]);
  const passwordInputRef = useRef();
  const bgmlinkInputRef = useRef();
  const ruleInputRef = useRef();
  const hashtagRef = useRef();

  useEffect(() => {
    titleRef.current.value = roomInfo.name;
    passwordInputRef.current.value = roomInfo.password ? roomInfo.password : "";
    bgmlinkInputRef.current.value = roomInfo.bgmlink ? roomInfo.bgmlink : "";
    ruleInputRef.current.value = roomInfo.rule ? roomInfo.bgmlink : "";
  }, []);

  // 필수 항목 입력 확인
  const [isCategorySelected, setIsCategorySelected] = useState(roomInfo.category);
  const [isUserLimitSelected, setIsUserLimitSelected] = useState(roomInfo.limitUsers);

  // for password validation
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [isClickedDetail, setIsClickedDetail] = useState(false);
  const [isHashtagInput, setIsHashtagInput] = useState(false);

  const clickDetailBtn = () => {
    setIsClickedDetail((prev) => !prev);
  };

  const clickSaveBtn = (e) => {
    e.preventDefault();
    setRoomInfo({
      ...roomInfo,
      name: titleRef.current.value
        ? titleRef.current.value.replace(/[\u{1F004}-\u{1F9E6}]|[\u{1F600}-\u{1F9D0}]/gu, "")
        : "",
      hashtags: Array.from(hashtag), // hashtag set to array
      isPublic: !passwordInputRef.current.value,
      password: passwordInputRef.current.value,
      bgmlink: bgmlinkInputRef.current.value,
      rule: ruleInputRef.current.value,
      startAt: new Date().toISOString(),
    });
    clickSettingBtn();
  };

  const categoryHandler = (category) => {
    setIsCategorySelected(true);
    setRoomInfo({ ...roomInfo, category: category.value });
  };

  const userLimitHandler = (value) => {
    setIsUserLimitSelected(true);
    setRoomInfo({ ...roomInfo, limitUsers: value });
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

  const addHashtagInputHandler = () => {
    setIsHashtagInput(true);
  };

  const deleteHashtagInputHandler = () => {
    setIsHashtagInput(false);
  };

  const newHashtagHandler = (label) => {
    setIsHashtagInput(false);
    const userInput = new Set(newHashtag);
    userInput.add(label);
    setNewHashtag(Array.from(userInput));
  };

  const deleteHandler = (label) => {
    setNewHashtag((prev) => prev.filter((item) => item !== label));
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

  const periodHandler = (value) => {
    setRoomInfo({ ...roomInfo, endAt: value });
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

  return (
    <section className={styles.container}>
      <div className={styles.default_box}>
        <div className={styles.roominfo_item}>
          <p className={styles.heading}>스터디 목표는 무엇인가요?</p>
          <p className={styles.sub_heading}>목표를 설정하면 방을 빠르고 쉽게 설정할 수 있어요.</p>
          <div className={styles.category}>
            {categories.map((c) => (
              <div key={c.value} className={styles.category_item}>
                <RadioButton
                  label={c.name}
                  group="category"
                  onChange={() => {
                    categoryHandler(c);
                  }}
                  disabled={disabled}
                  checked={c.value === roomInfo.category && "checked"}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 명 *</p>
          <Input
            placeholder={
              roomInfo.name ||
              (roomInfo.category && `${roomInfo.category} n호실`) ||
              "목표를 설정하거나, 직접 입력해주세요"
            }
            ref={titleRef}
            disabled={disabled}
          />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>인원 수 *</p>
          <Dropdown
            options={userLimitOptions}
            onSelect={userLimitHandler}
            disabled={disabled}
            defaultValue={`${roomInfo.limitUsers}명`}
          />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>해시태그</p>
          <div ref={hashtagRef} className={styles.hashtag_item}>
            {hashtags.map((item) => (
              <HashtagButton
                label={item}
                onToggle={hashtagHandler}
                disabled={disabled}
                checked={roomInfo.hashtags.find((tag) => tag === item) && "checked"}
              />
            ))}
            {newHashtag.map((label) => (
              <HashtagButton label={label} onDelete={() => deleteHandler(label)} checked="checked" />
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
                options={targetTimeOptions}
                onSelect={targetTimeHandler}
                disabled={disabled}
                defaultValue={`${roomInfo.targetTime}시간`}
              />
            </div>
            <div>
              <p className={styles.label}> 스터디 기간</p>
              <Dropdown
                options={periodOptions}
                onSelect={periodHandler}
                disabled={disabled}
                defaultValue={`${roomInfo.endAt}`}
              />
            </div>
            <div>
              <p className={styles.label}>비밀번호</p>
              <Input
                placeholder="숫자 4자리 비밀번호를 설정하세요"
                ref={passwordInputRef}
                maxLength="4"
                onChange={validPasswordHandler}
                isInvalid={isInvalidPassword}
                disabled={disabled}
              />
              <p className={`${styles.invalid_message} ${isInvalidPassword ? "" : styles.hide}`}>
                비밀번호는 숫자 4자리 입니다.
              </p>
            </div>
            <div>
              <p className={styles.label}>장치 규칙</p>
              <div className={styles.device_item}>
                <ToggleButton
                  icon={<Video />}
                  label="카메라 ON"
                  onToggle={videoRuleHandler}
                  disabled={disabled}
                  checked={roomInfo.isCamOn && "checked"}
                />
                <ToggleButton
                  icon={<MicOff />}
                  label="마이크 OFF"
                  onToggle={audioRuleHandler}
                  disabled={disabled}
                  checked={roomInfo.isMicOn && "checked"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>노래</p>
          <Input placeholder="유튜브 링크를 입력해주세요." ref={bgmlinkInputRef} disabled={disabled} />
        </div>
        <div className={styles.roominfo_item}>
          <p className={styles.label}>스터디 규칙</p>
          <Textarea placeholder="스터디 규칙은 여기에 작성해주세요." ref={ruleInputRef} disabled={disabled} />
        </div>
      </div>
      {userInfo.updateAllowed && (
        <div className={styles.save_button}>
          <button
            type="submit"
            onClick={clickSaveBtn}
            disabled={!(isCategorySelected && isUserLimitSelected && !isInvalidPassword)}
          >
            완료
          </button>
        </div>
      )}
    </section>
  );
}

export default SettingSection;
