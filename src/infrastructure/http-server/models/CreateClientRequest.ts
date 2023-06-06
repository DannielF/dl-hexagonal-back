import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientRequest {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
