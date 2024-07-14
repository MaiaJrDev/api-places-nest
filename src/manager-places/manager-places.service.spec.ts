import { Test, TestingModule } from '@nestjs/testing';
import { ManagerPlacesService } from './manager-places.service';

describe('ManagerPlacesService', () => {
  let service: ManagerPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerPlacesService],
    }).compile();

    service = module.get<ManagerPlacesService>(ManagerPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
