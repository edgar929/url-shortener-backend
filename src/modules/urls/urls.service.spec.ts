import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';

describe('UrlsService', () => {
  let service: UrlsService;
  let urlRepository: Repository<Url>;

  beforeEach(async () => {
    const mockUrlRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        { provide: getRepositoryToken(Url), useValue: mockUrlRepository }, // Mock Repository
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
    urlRepository = module.get<Repository<Url>>(getRepositoryToken(Url));
  });

  it('should generate a shortened URL', async () => {
    const mockUrl = {
      id: 1,
      longUrl: 'https://example.com',
      shortCode: 'abc123',
      createdAt: new Date(),
    };

    urlRepository.create = jest.fn().mockReturnValue(mockUrl);
    urlRepository.save = jest.fn().mockResolvedValue(mockUrl);

    const result = await service.create({ longUrl: 'https://example.com' }, 1);
    
    expect(result).toHaveProperty('shortCode', 'abc123');
    expect(result).toHaveProperty('longUrl', 'https://example.com');
  });
});
