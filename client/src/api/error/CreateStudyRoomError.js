import ApiError from "./ApiError";

export default class CreateStudyRoomError extends ApiError {
  constructor(error) {
    super(error.message, error.status);
    this.name = this.constructor.name;
  }
}
