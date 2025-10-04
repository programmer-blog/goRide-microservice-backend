import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class RiderCoordinatesService implements OnModuleInit {
  constructor(
    @InjectModel(RiderCoordinate.name)
    private readonly riderCoordinateModel: Model<RiderCoordinate>,
    @Inject('RIDER_SERVICE') private client: ClientProxy,
  ) {}

  async onModuleInit() {
    // Optional but recommended to avoid transient “Connection closed” on first call
    await this.client.connect();
  }

  async getCoordinates(rider: string | { rider?: string; id?: string }) {
    // normalize
    const riderId =
      typeof rider === 'string' ? rider : (rider?.rider ?? rider?.id);
    if (!riderId) throw new Error('rider id is required');

    // ✅ use riderId (string) in the query
    const coordinates = await this.riderCoordinateModel
      .find({ rider: riderId })
      .lean()
      .exec();

    // ✅ send a STRING payload (make handler expect string)
    const riderDetails = await firstValueFrom(
      this.client
        .send({ cmd: 'get-rider-details' }, riderId)
        .pipe(timeout(5000)),
    );

    return { coordinates, riderDetails };
  }

  async saveCoordinates(createCoordinateDTO: any) {
    return this.riderCoordinateModel.create(createCoordinateDTO);
  }
}
