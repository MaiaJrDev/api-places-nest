import { Module } from '@nestjs/common';
import { ManagerPlacesService } from './manager-places.service';
import { ManagerPlacesController } from './manager-places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entity/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  providers: [ManagerPlacesService],
  controllers: [ManagerPlacesController],
})
export class ManagerPlacesModule {}
