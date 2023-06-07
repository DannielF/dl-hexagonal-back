import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * @description CreateClientRequest model class
 * @author dannielf
 * @export
 * @class CreateClientRequest
 */
@InputType()
export class CreateClientRequest {
  @Field(() => String, { nullable: false, description: 'email' })
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', type: String, required: true })
  email: string;

  @Field(() => String, { nullable: false, description: 'password' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password', type: String, required: true })
  password: string;
}
