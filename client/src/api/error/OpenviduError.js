export default class OpenviduError extends Error {
  constructor(error, userMessage) {
    super(error.message);
    this.status = error.code;
    this.userMessage = userMessage;
  }
}
