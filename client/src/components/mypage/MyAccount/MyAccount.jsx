import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { EditButton, AccountDeleteModal } from "@components/mypage";
import { NicknameEditModal } from "@components/commons";
import { useModal } from "@hooks";
import styles from "./MyAccount.module.css";

function MyAccount() {
  const user = useRecoilValue(userState);
  const { isModal, openModal, closeModal } = useModal();
  const renderModal = (type) => openModal(type);

  return (
    <>
      {(isModal === "edit-nickname" && <NicknameEditModal onClose={closeModal} />) ||
        (isModal === "delete-account" && <AccountDeleteModal onClose={closeModal} />)}
      <section className={styles.account}>
        <div className={styles.heading}>
          <div>계정</div>
          <EditButton onClick={() => renderModal("edit-nickname")} />
        </div>
        <div className={styles.contents}>
          <div>
            <div className={styles.sub_heading}>닉네임</div>
            <div className={styles.nickname}>{user.nickname}</div>
          </div>
          <div>
            <div className={styles.sub_heading}>위험구역</div>
            <button type="button" className={styles.delete_btn} onClick={() => renderModal("delete-account")}>
              계정 삭제
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyAccount;
