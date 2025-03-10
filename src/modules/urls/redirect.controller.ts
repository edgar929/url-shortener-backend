import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller()
export class RedirectController {
  constructor(private readonly urlsService: UrlsService) {}

  @Public()
  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.urlsService.findOne(shortCode);
    return { url: url.originalUrl };
  }
}
