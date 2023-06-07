import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
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

  app.useGlobalFilters();

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://localhost:3001',
    ],
  });

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
