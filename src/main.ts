import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:'http://localhost:3000/'
  });
  await app.listen(4445);
}
bootstrap();
