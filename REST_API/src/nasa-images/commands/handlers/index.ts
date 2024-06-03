import { FlushNasaImagesToCacheHandler } from './flush-nasa-images-to-cache.handler';
import { SaveNasaImagesToCacheHandler } from './save-nasa-image-to-cache.handler';

export const CommandHandlers = [
  SaveNasaImagesToCacheHandler,
  FlushNasaImagesToCacheHandler,
];
