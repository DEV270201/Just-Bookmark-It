/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log("Listening on port 3000");
}
bootstrap();


// Some commands to keep in mind:
// 1. npx prisma migrate dev -> it will generate tables based on the given schema and push it to the Db
// 2. npx prisma generate -> it will generate all the types from the given schema
// 3. npx prisma studio -> it will start the UI for viewing and manipulating records