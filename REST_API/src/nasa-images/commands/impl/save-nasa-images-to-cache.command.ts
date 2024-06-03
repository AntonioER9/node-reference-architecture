import { SearchResponse } from 'src/nasa-images/core';

export class SaveNasaImageToCacheCommand {
  constructor(
    public readonly query: string,
    public readonly searchResponse: SearchResponse,
  ) {}
}
