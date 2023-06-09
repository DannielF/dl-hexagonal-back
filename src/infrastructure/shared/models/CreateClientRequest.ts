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

  @Field(() => String, { nullable: false, description: 'documentId' })
  @IsString()
  @ApiProperty({ example: '123456789', type: String, required: true })
  documentId: string;
}
