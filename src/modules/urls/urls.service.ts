import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import * as crypto from 'crypto';

@Injectable()
export class UrlsService {
  private generateShortCode(): string {
    const chars =
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 8;
    return Array.from(crypto.randomBytes(length))
      .map((byte) => chars[byte % chars.length])
      .join('');
  }

  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto, userId: number): Promise<Url> {
    const shortCode = this.generateShortCode();

    const url = this.urlsRepository.create({
      originalUrl: createUrlDto.longUrl,
      shortUrl: shortCode,
      user: { id: userId },
    });

    return this.urlsRepository.save(url);
  }

  async findAllByUser(userId: number): Promise<Url[]> {
    return this.urlsRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });
  }

  async findOne(shortCode: string): Promise<Url> {
    const url = await this.urlsRepository.findOne({
      where: {
        shortUrl: shortCode,
      },
      relations: ['user'],
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    // Increment clicks
    await this.urlsRepository.update(
      { id: url.id },
      { clicks: () => 'clicks + 1' },
    );

    return url;
  }

  async verifyUrlOwnership(shortCode: string, userId: number): Promise<Url> {
    const url = await this.findOne(shortCode);

    if (url.user.id !== userId) {
      throw new ForbiddenException('You do not own this URL');
    }

    return url;
  }

  async deleteUrl(shortCode: string, userId: number): Promise<void> {
    const url = await this.verifyUrlOwnership(shortCode, userId);
    await this.urlsRepository.remove(url);
  }
}
