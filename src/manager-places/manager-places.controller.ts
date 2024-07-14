import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ManagerPlacesService } from './manager-places.service';
import { Place } from './entity/place.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager-places')
@UseGuards(AuthGuard('jwt'))
export class ManagerPlacesController {
  constructor(private readonly managerPlacesService: ManagerPlacesService) {}

  @Post('create-place')
  async createPlace(@Body() placeDto: Place): Promise<Place> {
    return this.managerPlacesService.creatPlace(placeDto);
  }

  @Get('getAll')
  async getAllPlaces(): Promise<Place[]> {
    return this.managerPlacesService.getAllPlaces();
  }

  @Get('search-places')
  async searchPlaces(
    @Query() queryParams: { name?: string; city?: string; state?: string },
  ): Promise<Place[]> {
    return await this.managerPlacesService.searchPlaces(queryParams);
  }

  @Put('edit-place')
  async editPlace(
    @Query('id') id: number,
    @Body() editPlaceDto: Place,
  ): Promise<Place> {
    return this.managerPlacesService.editPlace(id, editPlaceDto);
  }

  @Delete('delete-place')
  async deletePlace(@Query('id') id: number): Promise<string> {
    return this.managerPlacesService.deletePlace(id);
  }
}
