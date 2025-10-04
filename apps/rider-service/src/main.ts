import { NestFactory } from '@nestjs/core';
import { RiderServiceModule } from './rider-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RiderServiceModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 3001 },
    },
  );
  console.log('[RIDER] starting microservice on tcp://0.0.0.0:3001');
  await app.listen();
  console.log('[RIDER] microservice is listening');
}
bootstrap();
