import { Body, Controller, Post } from '@nestjs/common';
import { RiderServiceService } from './rider-service.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { Rider } from './rider.entity';
import { CreateRiderDTO } from './dto/create-rider.dto';

type RiderDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

@Controller('rider')
export class RiderServiceController {
  constructor(private readonly _riderService: RiderServiceService) {}

  @Post()
  create(@Body() createRiderDto: CreateRiderDTO): Promise<Rider> {
    return this._riderService.create(createRiderDto);
  }

  @MessagePattern({ cmd: 'get-rider-details' })
  async getRiderById(
    @Payload() id: number,
    @Ctx() _context: RmqContext, // underscore to avoid unused var warning
  ): Promise<RiderDto> {
    const rider = await this._riderService.findById(id);
    if (!rider) {
      throw new RpcException('Rider not found');
    }

    return {
      id: rider.id,
      firstName: rider.firstName,
      lastName: rider.lastName,
      email: rider.email,
    };
  }
}
