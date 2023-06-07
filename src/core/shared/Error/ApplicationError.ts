/**
 * @description Application error class, used to throw errors in the application layer
 * @author dannielf
 * @export
 * @class ApplicationError
 * @extends {Error}
 */
export class ApplicationError extends Error {
  __proto__ = Error;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
