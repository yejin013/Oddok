const CREATE_ERROR_MAP = {
  400: { message: "필수 항목을 입력해주세요." },
};

export const errorMapping = (key, error) => {
  let defaultAction = { message: error.data.message, action: "메인으로 돌아가기", route: "/" };
  switch (key) {
    case "create-room":
      if (CREATE_ERROR_MAP[error.status]) defaultAction = CREATE_ERROR_MAP[error.status];
      return defaultAction;
    default:
      return defaultAction;
  }
};
