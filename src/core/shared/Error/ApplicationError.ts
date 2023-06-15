/**
 * @description Application error class, used to throw errors in the application layer
 * @author dannielf
 * @export
 * @class ApplicationError
 * @extends {Error}
 */
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
