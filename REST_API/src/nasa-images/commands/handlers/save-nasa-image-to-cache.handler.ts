import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';

import { NasaImagesSearchCache } from 'src/nasa-images/core';
import { SaveNasaImageToCacheCommand } from '../impl';

@CommandHandler(SaveNasaImageToCacheCommand)
export class SaveNasaImagesToCacheHandler
  implements ICommandHandler<SaveNasaImageToCacheCommand>
{
  logger = new Logger(SaveNasaImagesToCacheHandler.name);

  constructor(
    @InjectRepository(NasaImagesSearchCache)
    private nasaImagesSearchCacheRepository: Repository<NasaImagesSearchCache>,
  ) {}

  async execute(command: SaveNasaImageToCacheCommand): Promise<any> {
    const { query, searchResponse } = command;

    try {
      this.logger.debug({ query, searchResponse });
      const utc = DateTime.utc();
      const entity = {
        query,
        json_response: JSON.stringify(searchResponse),
        expires_at: utc.plus({ minutes: 30 }).toSQL(),
        updated_at: utc.toSQL(),
      };
      const upsertResult = await this.nasaImagesSearchCacheRepository.upsert(
        entity,
        ['query'],
      );
      this.logger.debug({ upsertResult });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
