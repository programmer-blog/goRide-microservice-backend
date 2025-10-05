import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [
          process.env.RABBITMQ_URL ?? 'amqp://user:password@localhost:5672',
        ],
        queue: process.env.RABBITMQ_QUEUE ?? 'rider_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  await microservice.listen();
}
bootstrap();
