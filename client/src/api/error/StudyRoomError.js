import ApiError from "./ApiError";

export default class StudyRoomError extends ApiError {
  constructor(error, userMessage) {
    super(error.message, error.status);
    this.userMessage = userMessage;
  }
}
