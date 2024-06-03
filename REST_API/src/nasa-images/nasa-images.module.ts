import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NasaImagesController } from './nasa-images.controller';
import { NasaImagesSearchCache } from './core/nasa-images-search-cache.entity';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { NasaImagesApiService } from './infrastructure';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([NasaImagesSearchCache])],
  providers: [...CommandHandlers, ...QueryHandlers, NasaImagesApiService],
  controllers: [NasaImagesController],
})
export class NasaImagesModule {}
