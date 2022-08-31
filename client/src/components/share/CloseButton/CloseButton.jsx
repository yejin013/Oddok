import React from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "@hooks";
import { Modal } from "@components/commons";
import { Cancel } from "@icons";
import styles from "./CloseButton.module.css";

function CloseButton() {
  const history = useHistory();
  const { isModal, openModal, closeModal } = useModal();

  return (
    <>
      <div className={styles.btn_container}>
        <button className={styles.close_btn} type="button" onClick={openModal}>
          <Cancel />
          <span>닫기</span>
        </button>
      </div>
      {isModal && (
        <Modal
          title="나가기"
          content={
            "이 페이지를 나가면 공유가 불가능합니다.\n마이페이지 > 공부기록에서 조회할 수 있습니다. 정말 나가시겠습니까?"
          }
          onClose={closeModal}
          onSubAction={{ text: "취소", action: closeModal }}
          onAction={{ text: "나가기", action: () => history.replace("/") }}
        />
      )}
    </>
  );
}
export default CloseButton;
