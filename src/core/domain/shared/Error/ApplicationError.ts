export class ApplicationError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
