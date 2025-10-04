import { Module } from '@nestjs/common';
import { RiderServiceController } from './rider-service.controller';
import { RiderServiceService } from './rider-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rider } from './rider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rider])],
  controllers: [RiderServiceController],
  providers: [RiderServiceService],
})
export class RiderServiceModule {}
