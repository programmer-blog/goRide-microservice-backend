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
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1', // if both processes run on the same host (not Docker)
          port: 3001, // must match rider microservice
        },
      },
    ]),
  ],
  controllers: [RiderCoordinatesController],
  providers: [RiderCoordinatesService],
})
export class RiderCoordinatesModule {}
