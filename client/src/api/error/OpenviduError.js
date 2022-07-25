export default class OpenviduError extends Error {
  constructor(error, message) {
    super(message || error.message);
    this.status = error.code;
  }
}
