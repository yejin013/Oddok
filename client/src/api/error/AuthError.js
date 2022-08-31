import ApiError from "./ApiError";

class AuthError extends ApiError {
  constructor(error, userMessage, action) {
    super(error.message, error.status);
    this.userMessage = userMessage;
    this.action = action;
  }
}

export default AuthError;
