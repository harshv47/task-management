import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Task Management')
  .setDescription('Task Management API docs')
  .setVersion('1.0')
  .addTag('main')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = 3000;

  await app.listen(port);

  logger.log(`Application listenng on port: ${port}`);
}
bootstrap();
