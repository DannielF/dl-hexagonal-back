import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApplicationError,
  ClientServiceError,
  TransactionServiceError,
} from '../../../core/shared';

/**
 * @description Filter for wallet controller exceptions
 * @author dannielf
 * @export
 * @class WalletFilter
 * @implements {ExceptionFilter}
 */
@Catch(ApplicationError, ClientServiceError, TransactionServiceError)
export class WalletFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    Logger.error(
      `WalletController (${request.method}) at {${request.path}} error: ${exception.message}`,
    );

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      path: request.url,
    });
  }
}
