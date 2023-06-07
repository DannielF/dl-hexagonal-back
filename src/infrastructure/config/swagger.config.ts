import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

/**
 * @description Swagger configuration file
 * @export
 */
export const config = new DocumentBuilder()
  .setTitle('Wallet API')
  .setDescription('Wallet API description')
  .setVersion('1.0')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .build();

export const options: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

export const swaggerOptions: SwaggerCustomOptions = {
  url: 'http://localhost:3000/api/v1',
};
