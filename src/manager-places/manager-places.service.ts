import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './entity/place.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ManagerPlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    private dataSource: DataSource,
  ) {}

  async creatPlace(placeDto: Place): Promise<Place> {
    const newPlace = this.placeRepository.create(placeDto);
    return await this.placeRepository.save(newPlace);
  }

  async getAllPlaces(): Promise<Place[]> {
    return await this.dataSource.query('SELECT * FROM places');
  }

  async searchPlaces(queryParams: {
    name?: string;
    city?: string;
    state?: string;
  }): Promise<Place[]> {
    const { name, city, state } = queryParams;

    let query = 'SELECT * FROM places WHERE 1=1';

    if (name) {
      query += ` AND name ILIKE '%${name}%'`;
    }
    if (city) {
      query += ` AND city ILIKE '%${city}%'`;
    }
    if (state) {
      query += ` AND state ILIKE '%${state}%'`;
    }

    return await this.dataSource.query(query);
  }

  async editPlace(id: number, editPlaceDto: Place): Promise<Place> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('You need to provide a valid ID');
    }

    const existingPlace = await this.placeRepository.findOne({
      where: { id },
    });

    if (!existingPlace) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }

    existingPlace.name = editPlaceDto.name;
    existingPlace.city = editPlaceDto.city;
    existingPlace.state = editPlaceDto.state;

    return await this.placeRepository.save(existingPlace);
  }

  async deletePlace(id: number): Promise<string> {
    try {
      const result = await this.placeRepository.delete(id);
      const message = !result.affected
        ? 'no lines affected'
        : 'place deleted successfully';
      return `message: ${message}`;
    } catch (error) {
      return error.message;
    }
  }
}
