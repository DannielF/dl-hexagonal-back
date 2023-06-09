import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config, options, swaggerOptions } from './infrastructure/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(3000);
  Logger.log(`Running on 🚀: ${(await app.getUrl()).toString()}`);
}
bootstrap();
