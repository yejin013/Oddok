import React from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { errorState } from "@recoil/error-state";
import { Modal } from "@components/commons";
import { MESSAGE, ACTION } from "@utils/constants/API_ERROR";

function ErrorModal({ history }) {
  const [error, setError] = useRecoilState(errorState);

  const handleClose = () => {
    setError(null);
  };

  const redirect = (path) => {
    setError(null);
    history.push(path);
  };

  return (
    error && (
      <Modal
        title="⚠️"
        content={MESSAGE[error.name] ?? error.message}
        onClose={handleClose}
        onAction={{
          text: ACTION[error.name]?.text ?? "메인으로 이동하기",
          action: () => redirect(ACTION[error.name]?.path ?? "/"),
        }}
      />
    )
  );
}

export default withRouter(ErrorModal);
