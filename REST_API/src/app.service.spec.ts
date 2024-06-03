import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello [NAME]!! Your user id is: "', () => {
      const mockName = 'John Doe';

      const mockGetHelloResponse = `Hello ${mockName}!! Your user id is: `;

      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => mockGetHelloResponse);
    });
  });
});
