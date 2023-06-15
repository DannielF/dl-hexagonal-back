/**
 * @description Client service error class
 * @author dannielf
 * @export
 * @class ClientServiceError
 * @extends {Error}
 */
export class ClientServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
