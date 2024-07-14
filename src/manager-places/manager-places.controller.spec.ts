import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPlacesController } from './manager-places.controller';

describe('ManagerPlacesController', () => {
  let controller: ManagerPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerPlacesController],
    }).compile();

    controller = module.get<ManagerPlacesController>(ManagerPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
