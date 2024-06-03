import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NasaImagesSearchCache } from 'src/nasa-images/core';
import { FlushNasaImageCacheCommand } from '../impl';
import { SaveNasaImagesToCacheHandler } from './save-nasa-image-to-cache.handler';

@CommandHandler(FlushNasaImageCacheCommand)
export class FlushNasaImagesToCacheHandler
  implements ICommandHandler<FlushNasaImageCacheCommand>
{
  logger = new Logger(SaveNasaImagesToCacheHandler.name);

  constructor(
    @InjectRepository(NasaImagesSearchCache)
    private nasaImagesSearchCacheRepository: Repository<NasaImagesSearchCache>,
  ) {}

  async execute(command: FlushNasaImageCacheCommand): Promise<any> {
    await this.nasaImagesSearchCacheRepository.clear();
  }
}
