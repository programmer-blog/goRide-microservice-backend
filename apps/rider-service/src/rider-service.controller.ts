import { Controller } from '@nestjs/common';
import { RiderServiceService } from './rider-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RiderServiceController {
  constructor(private readonly riderServiceService: RiderServiceService) {}

  @MessagePattern({ cmd: 'get-rider-details' })
  async getRiderById(@Payload() id: string): Promise<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }> {
    return Promise.resolve({
      _id: id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
    });
  }
}
