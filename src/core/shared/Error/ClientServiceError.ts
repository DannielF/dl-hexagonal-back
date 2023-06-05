export class ClientServiceError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ClientServiceError.prototype);
  }
}
