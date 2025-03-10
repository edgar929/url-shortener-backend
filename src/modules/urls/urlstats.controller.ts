import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('analytics') 
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get(':shortUrl')
  getStats(@Param('shortUrl') shortUrl: string) {
    return this.urlsService.findOne(shortUrl);
  }
}
