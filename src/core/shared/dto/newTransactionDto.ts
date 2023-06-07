import { TransactionType } from 'src/core/domain';

/**
 * @description New transaction dto interface
 * @author dannielf
 * @export
 * @interface NewTransactionDto
 */
export interface NewTransactionDto {
  from: string;
  to: string;
  type: TransactionType;
  quantity: number;
}
