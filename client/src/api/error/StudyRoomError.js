import ApiError from "./ApiError";

class StudyRoomError extends ApiError {
  constructor(error, userMessage) {
    super(error.message, error.status);
    this.userMessage = userMessage;
  }
}

export default StudyRoomError;
