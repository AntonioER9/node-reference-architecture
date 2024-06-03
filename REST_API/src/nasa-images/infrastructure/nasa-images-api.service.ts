import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

import { SearchResponse } from '../core/nasa-images.interface';
import { INasaImagesApiService } from '../core/nasa-images-api.interface';

@Injectable()
export class NasaImagesApiService implements INasaImagesApiService {
  logger = new Logger(NasaImagesApiService.name);

  async search(query: string): Promise<SearchResponse> {
    try {
      const { data, status } = await axios.get<SearchResponse>(
        `https://images-api.nasa.gov/search`,
        {
          params: {
            q: query,
          },
          headers: {
            Accept: 'application/json',
          },
        },
      );
      if (status === 200) {
        return data;
      } else {
        throw new Error(`Invalid response status: ${status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.log('Axios Error: ', error.message);
        throw error;
      } else {
        this.logger.log('Unexpected Error: ', error);
        throw error;
      }
    }
  }
}
