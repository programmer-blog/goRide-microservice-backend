import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCoordinatesDTO } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
  constructor(private coordinateService: RiderCoordinatesService) {}

  @Get(':rider')
  getRiderCoordinates(@Param('rider') riderId: string) {
    return this.coordinateService.getCoordinates(riderId);
  }

  @Post()
  saveRiderCoordinates(
    @Body()
    createCoordinateDTO: CreateCoordinatesDTO,
  ) {
    // Logic to save rider coordinates
    return this.coordinateService.saveCoordinates(createCoordinateDTO);
  }
}
