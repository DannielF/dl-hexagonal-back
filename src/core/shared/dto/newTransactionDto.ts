import { TransactionType } from 'src/core/domain';

export interface NewTransactionDto {
  from: string;
  to: string;
  type: TransactionType;
  quantity: number;
}
