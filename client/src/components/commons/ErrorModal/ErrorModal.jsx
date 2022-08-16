import React from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { errorState } from "@recoil/error-state";
import { Modal } from "@components/commons";

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
        content={error.userMessage ?? error.message}
        onClose={handleClose}
        onAction={{
          text: error.action?.text ?? "메인으로 이동하기",
          action: () => redirect(error.action?.path ?? "/"),
        }}
      />
    )
  );
}

export default withRouter(ErrorModal);
