import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

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
}
