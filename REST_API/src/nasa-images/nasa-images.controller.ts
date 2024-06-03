import { Controller, Get, Header, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NasaImagesQuery } from './queries/impl';

@Controller('nasa-images')
export class NasaImagesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  async getCurrentUser(
    @Query('q') q: string,
    @Query('no-cache') noCache: boolean,
  ): Promise<string> {
    return JSON.stringify(
      await this.queryBus.execute(new NasaImagesQuery(q, noCache)),
    );
  }
}
