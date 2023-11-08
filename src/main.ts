import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cors({
    origin:true,
    credentials: true,
  }))
  await app.listen(4445);
}
bootstrap();
