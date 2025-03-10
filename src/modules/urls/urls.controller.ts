import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Redirect,
  Delete,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('urls')
@ApiBearerAuth()
@Controller('urls')
@UseGuards(JwtAuthGuard)
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('shorten')
  create(@Body() createUrlDto: CreateUrlDto, @GetUser() user: User) {
    return this.urlsService.create(createUrlDto, user.id);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.urlsService.findAllByUser(user.id);
  }

  @Public()
  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.urlsService.findOne(shortCode);
    return { url: url.originalUrl };
  }

  @Get(':shortCode')
  findOne(@Param('shortCode') shortCode: string, @GetUser() user: User) {
    return this.urlsService.verifyUrlOwnership(shortCode, user.id);
  }

  @Get(':shortCode/stats')
  getStats(@Param('shortCode') shortCode: string) {
    return this.urlsService.findOne(shortCode);
  }

  @Delete(':shortCode')
  async deleteUrl(
    @Param('shortCode') shortCode: string,
    @GetUser() user: User,
  ) {
    return this.urlsService.deleteUrl(shortCode, user.id);
  }
}
