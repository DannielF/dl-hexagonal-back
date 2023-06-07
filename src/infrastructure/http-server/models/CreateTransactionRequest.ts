import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive, IsString, IsUUID } from 'class-validator';
import { TransactionType } from 'src/core/domain';

/**
 * @description CreateTransactionRequest model class
 * @author dannielf
 * @export
 * @class CreateTransactionRequest
 */
export class CreateTransactionRequest {
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    type: String,
    required: true,
  })
  from: string;

  @IsString()
  @IsUUID()
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    type: String,
    required: true,
  })
  to: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 100, type: Number, required: true })
  quantity: number;

  @IsEnum(TransactionType)
  @ApiProperty({
    example: TransactionType.DEPOSIT,
    enum: TransactionType,
    required: true,
  })
  type: TransactionType;
}
