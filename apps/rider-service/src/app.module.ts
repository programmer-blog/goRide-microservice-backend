import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderServiceModule } from './rider-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'riders_db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    RiderServiceModule,
  ],
})
export class AppModule {}
