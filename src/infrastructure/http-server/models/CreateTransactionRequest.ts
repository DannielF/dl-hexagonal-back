import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUUID } from 'class-validator';

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
}
