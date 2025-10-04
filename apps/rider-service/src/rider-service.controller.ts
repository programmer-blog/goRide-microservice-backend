import { Controller } from '@nestjs/common';
import { RiderServiceService } from './rider-service.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

type RiderDto = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

@Controller()
export class RiderServiceController {
  // underscore avoids TS "unused" errors if noUnusedLocals is true
  constructor(private readonly _riderService: RiderServiceService) {}

  @MessagePattern({ cmd: 'get-rider-details' })
  async getRiderById(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<RiderDto> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const rider: RiderDto = {
        _id: id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
      };
      channel.ack(originalMsg);
      return rider;
    } catch (err) {
      channel.nack(originalMsg, false, false); // nack, don't requeue
      throw err;
    }
  }
}
