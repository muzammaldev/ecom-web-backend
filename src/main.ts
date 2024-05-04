import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 8000;
  await app.listen(port);
  console.log(`App running Port is ${port}`);
  console.log("MongoDb Conected");
}
bootstrap();
