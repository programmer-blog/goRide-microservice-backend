import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from './rider.entity';
import { Repository } from 'typeorm';
import { CreateRiderDTO } from './dto/create-rider.dto';

@Injectable()
export class RiderServiceService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderRepository: Repository<Rider>,
  ) {}
  async findById(id: number): Promise<Rider | null> {
    return await this.riderRepository.findOneBy({ id: id });
  }

  create(createRiderDTO: CreateRiderDTO): Promise<Rider> {
    const rider = new Rider();
    rider.firstName = createRiderDTO.firstName;
    rider.lastName = createRiderDTO.lastName;
    rider.email = createRiderDTO.email;
    return this.riderRepository.save(rider);
  }

  async findAll(): Promise<Rider[]> {
    return await this.riderRepository.find();
  }
}
