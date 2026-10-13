import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // server setting
  app.enableCors({ origin: process.env.CLIENT_URL });
  app.setGlobalPrefix(process.env.SERVER_GLOBAL_PREFIX!);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.SERVER_PORT!);
}
await bootstrap();
