import { HealthCheckService, TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckStatus } from '@nestjs/terminus/dist/health-check/health-check-result.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmHealthIndicator],
      controllers: [HealthController],
      imports: [TerminusModule],
    }).compile();

    controller = module.get<HealthController>(HealthController);

    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should check server application status', async () => {
      const status: HealthCheckStatus = 'ok';

      const mockResponse = {
        status: status,
        details: {},
      };

      jest
        .spyOn(healthCheckService, 'check')
        .mockImplementation(() => Promise.resolve(mockResponse));

      expect(await controller.check()).toBe(mockResponse);

      expect(healthCheckService.check).toHaveBeenCalledTimes(1);
    });
  });
});
