export const MESSAGE = {
  CREATE_STUDY_ROOM: {
    403: "이미 개설한 스터디가 있어 요청이 실패했습니다.\n기존 스터디룸을 삭제하고 다시 시도해주세요.",
  },
  JOIN_STUDY_ROOM: {
    400: "이미 참여중인 스터디가 있어 요청이 실패했습니다.\n기존 스터디룸에서 나간 후 다시 시도해주세요.",
    404: "존재하지 않는 스터디룸입니다.\n다른 스터디룸을 이용해 주세요.",
  },
  UPDATE_STUDY_ROOM: {
    403: "삭제 권한이 없어 요청이 실패했습니다.",
    404: "스터디룸이 존재하지 않아 요청이 실패했습니다.",
  },
  LEAVE_STUDY_ROOM: {
    400: "잘못된 요청입니다.",
    404: "스터디룸이 존재하지 않아 요청이 실패했습니다.",
  },
};

export const OPENVIDU_MESSAGE = {
  CONNECT: {
    401: "스터디룸 재입장에 실패했습니다.",
  },
};

export const ACTION = {
  // LoginError: { text: "다시 로그인하기", path: "/login" },
};
