import ApiError from "./ApiError";

export default class JoinStudyRoomError extends ApiError {
  constructor(error) {
    super(error.message);
  }
}
