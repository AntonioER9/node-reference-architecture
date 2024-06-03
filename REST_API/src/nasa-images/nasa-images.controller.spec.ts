import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { NasaImagesController } from './nasa-images.controller';
import { ConfigModule } from '@nestjs/config';

describe('NasaImagesApiController', () => {
  let controller: NasaImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvVars: true,
          ignoreEnvFile: true,
          load: [
            () => ({ IntersectionOptions: { number_of_decimal_places: '3' } }),
          ],
        }),
        CqrsModule,
      ],
      providers: [],
      controllers: [NasaImagesController],
    }).compile();

    controller = module.get<NasaImagesController>(NasaImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
