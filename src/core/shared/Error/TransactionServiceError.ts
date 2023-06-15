/**
 * @description Transaction service error class
 * @author dannielf
 * @export
 * @class TransactionServiceError
 * @extends {Error}
 */
export class TransactionServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
