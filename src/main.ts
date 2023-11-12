import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
    origin: true, // Разрешаем доступ только с этого домена
    credentials: true, // Разрешаем отправку куки
    methods: 'GET,POST', // Разрешаем отправку только этих методов
    allowedHeaders: 'Content-Type,Authorization', // Разрешаем только указанные заголовки
  });
  await app.listen(4445);
}
bootstrap();
