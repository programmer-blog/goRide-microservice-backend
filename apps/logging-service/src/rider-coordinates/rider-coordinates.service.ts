import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
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
  private readonly logger = new Logger(RiderCoordinatesService.name);

  async onModuleInit() {
    // Optional but recommended to avoid transient “Connection closed” on first call
    await this.client.connect();
  }

  async getCoordinates(rider: string | { rider?: string; id?: string }) {
    const riderId =
      typeof rider === 'string' ? rider : (rider?.rider ?? rider?.id);
    if (!riderId) throw new BadRequestException('rider id is required');

    const coordinates = await this.riderCoordinateModel
      .find({ rider: riderId })
      .lean()
      .exec();

    try {
      const riderDetails = await firstValueFrom(
        this.client
          .send({ cmd: 'get-rider-details' }, riderId)
          .pipe(timeout(5000)),
      );
      return { coordinates, riderDetails };
    } catch (err) {
      this.logger.error(`RMQ request failed for rider ${riderId}`, err);
      throw new ServiceUnavailableException(
        'Rider Service unavailable or timed out',
      );
    }
  }

  async saveCoordinates(createCoordinateDTO: any) {
    return this.riderCoordinateModel.create(createCoordinateDTO);
  }
}
