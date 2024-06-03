import { Logger } from '@nestjs/common';
import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';

import { NasaImagesSearchCache, SearchResponse } from 'src/nasa-images/core';
import { NasaImagesQuery } from '../impl';
import { SaveNasaImageToCacheCommand } from 'src/nasa-images/commands/impl/save-nasa-images-to-cache.command';
import { NasaImagesApiService } from 'src/nasa-images/infrastructure';

@QueryHandler(NasaImagesQuery)
export class NasaImagesQueryHandler implements IQueryHandler<NasaImagesQuery> {
  logger = new Logger(NasaImagesQueryHandler.name);

  constructor(
    @InjectRepository(NasaImagesSearchCache)
    private readonly nasaImagesSearchCacheRepository: Repository<NasaImagesSearchCache>,
    private readonly nasaImagesApiService: NasaImagesApiService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(query: NasaImagesQuery) {
    return this.search(query.search, query.useCache);
  }

  async #getFromCache(query: string) {
    try {
      this.logger.debug({ query });
      const result = await this.nasaImagesSearchCacheRepository.findOneBy({
        query,
      });
      this.logger.debug({ result });
      const now = DateTime.utc();
      if (result && DateTime.fromSQL(result.expires_at) > now) {
        return <SearchResponse>JSON.parse(result.json_response);
      }
      return null;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async search(query: string, noCache = false) {
    let result = !noCache ? await this.#getFromCache(query) : null;
    if (result) {
      return result;
    }

    result = await this.nasaImagesApiService.search(query);
    await this.commandBus.execute(
      new SaveNasaImageToCacheCommand(query, result),
    );
    return result;
  }
}
