export class UserServiceError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserServiceError.prototype);
  }
}
