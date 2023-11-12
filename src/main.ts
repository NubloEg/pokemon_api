import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.setGlobalPrefix('api');
 app.enableCors({
    origin: ['https://pokemon-game-delta.vercel.app/auth','http://localhost:3000'], // Разрешаем доступ только с этого домена
    credentials: true, // Разрешаем отправку куки
    methods: 'GET,POST', // Разрешаем отправку только этих методов
    allowedHeaders: 'Content-Type,Authorization', // Разрешаем только указанные заголовки
  });
  await app.listen(4445);
}
bootstrap();
