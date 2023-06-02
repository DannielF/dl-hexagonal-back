export class TransactionServiceError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TransactionServiceError.prototype);
  }
}