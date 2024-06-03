import { SearchResponse } from './nasa-images.interface';

export interface INasaImagesApiService {
  search(query: string): Promise<SearchResponse>;
}
