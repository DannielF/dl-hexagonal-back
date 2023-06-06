import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientRequest {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', type: String, required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', type: String, required: true })
  password: string;
}
