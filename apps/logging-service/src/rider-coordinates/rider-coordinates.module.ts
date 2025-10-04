import { Module } from '@nestjs/common';
import { RiderCoordinatesController } from './rider-coordinates.controller';
import { RiderCoordinatesService } from './rider-coordinates.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RiderCoordinate,
  RiderCoordinatesSchema,
} from './schemas/rider-coordinates.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // If you don't already call MongooseModule.forRoot(...) in a higher module,
    // do it there. Keeping only forFeature here is fine if forRoot is elsewhere.
    MongooseModule.forFeature([
      {
        name: RiderCoordinate.name,
        schema: RiderCoordinatesSchema,
      },
    ]),
    ClientsModule.register([
      {
        name: 'RIDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://user:password@localhost:5672',
          ],
          queue: process.env.RABBITMQ_QUEUE ?? 'rider_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [RiderCoordinatesController],
  providers: [RiderCoordinatesService],
})
export class RiderCoordinatesModule {}
