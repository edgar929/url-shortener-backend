import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './urlstats.controller';
import { UrlsService } from './urls.service';

describe('StatsController', () => {
  let controller: StatsController;
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        {
          provide: UrlsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ shortCode: 'abc123', clicks: 10 }),
          },
        },
      ],
    }).compile();

    controller = module.get<StatsController>(StatsController);
    service = module.get<UrlsService>(UrlsService);
  });

  it('should return analytics for a short URL', async () => {
    const result = await controller.getStats('abc123');
    expect(result).toEqual({ shortCode: 'abc123', clicks: 10 });
  });
});
