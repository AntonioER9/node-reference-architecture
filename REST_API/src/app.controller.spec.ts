import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello [NAME]!! Your user id is: [USERID]"', () => {
      const mockName = 'John Doe';
      const mockUserId = 'test-id';

      const mockGetHelloResponse = `Hello ${mockName}!! Your user id is: `;

      jest
        .spyOn(appService, 'getHello')
        .mockImplementation(() => mockGetHelloResponse);

      expect(appController.getHello(mockUserId)).toBe(
        mockGetHelloResponse + mockUserId,
      );
    });
  });
});
