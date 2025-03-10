import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsController } from './urls.controller';
import { StatsController } from './urlstats.controller';
import { UrlsService } from './urls.service';
import { Url } from './entities/url.entity';
import { RedirectController } from './redirect.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlsController, RedirectController, StatsController],
  providers: [UrlsService],
  exports: [UrlsService],
})
export class UrlsModule {}
