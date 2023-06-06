import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTransactionRequest {
  @IsString()
  @IsUUID()
  from: string;

  @IsString()
  @IsUUID()
  to: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
