import React, { useRef, useState } from "react";
import { Thumbnail } from "@components/commons";
import { Image, Trash } from "@icons";
import styles from "./ImageForm.module.css";

function ImageForm() {
  const imgFileRef = useRef();
  const [imgFile, setImgFile] = useState();

  const clickAddBtn = () => {
    imgFileRef.current.click();
  };

  const clickDeleteBtn = () => {
    URL.revokeObjectURL(imgFile);
    setImgFile("");
  };

  const onChangeImgFile = (e) => {
    setImgFile(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  };

  return (
    <div>
      <h3 className={styles.label}>스터디 이미지</h3>
      <input type="file" className={styles.input} ref={imgFileRef} accept="image/*" onChange={onChangeImgFile} />
      <div className={styles.image}>
        {imgFile ? <img src={imgFile} alt="studyroom-thumbnail" /> : <Thumbnail />}
        <div className={styles.buttons}>
          <button type="button" className={styles.add} onClick={clickAddBtn}>
            <Image />
            <span>이미지 추가</span>
          </button>
          <button type="button" className={styles.delete} onClick={clickDeleteBtn}>
            <Trash />
            <span>이미지 삭제</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;
