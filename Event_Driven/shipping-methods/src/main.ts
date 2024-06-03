import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './config/kafka.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const kafkaConsumer = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    kafkaConfig,
  );

  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  await kafkaConsumer.listen();
}
bootstrap();
