/**
 * @description Client service error class
 * @author dannielf
 * @export
 * @class ClientServiceError
 * @extends {Error}
 */
export class ClientServiceError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ClientServiceError.prototype);
  }
}
