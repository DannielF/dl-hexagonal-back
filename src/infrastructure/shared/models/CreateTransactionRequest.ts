import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../../../core/domain';

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

/**
 * @description CreateTransactionRequest model class
 * @author dannielf
 * @export
 * @class CreateTransactionRequest
 */
@InputType()
export class CreateTransactionRequest {
  @Field(() => String, { nullable: false, description: 'fromClient' })
  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'email@email.com',
    type: String,
    required: true,
  })
  from: string;

  @Field(() => String, { nullable: false, description: 'toClient' })
  @IsEmail()
  @IsString()
  @ApiProperty({
    example: 'email@email.com',
    type: String,
    required: true,
  })
  to: string;

  @Field(() => Int, { nullable: false, description: 'quantity' })
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 100, type: Number, required: true })
  quantity: number;

  @Field(() => TransactionType, {
    nullable: false,
    description: 'transaction type',
  })
  @IsEnum(TransactionType)
  @ApiProperty({
    example: TransactionType.DEPOSIT,
    enum: TransactionType,
    required: true,
  })
  type: TransactionType;

  @Field(() => String, { nullable: false, description: 'clientId' })
  @IsUUID()
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    type: String,
    required: true,
  })
  clientId: string;
}
