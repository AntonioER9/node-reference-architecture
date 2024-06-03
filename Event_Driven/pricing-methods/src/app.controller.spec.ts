import { Test, TestingModule } from '@nestjs/testing';
import AppController from './app.controller';
import { ClientKafka, KafkaContext } from '@nestjs/microservices';
import PricingTypeStrategyFactory from './strategies/pricing-type-strategy.factory';
import { Logger } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let clientKafka: ClientKafka;
  let logger: Logger;
  let strategyFactory: PricingTypeStrategyFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'KAFKA_CLIENT',
          useValue: { emit: jest.fn(), subscribeToResponseOf: jest.fn() },
        },
        {
          provide: Logger,
          useValue: { log: jest.fn() },
        },
        {
          provide: PricingTypeStrategyFactory,
          useValue: { getStrategy: jest.fn() },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    clientKafka = module.get<ClientKafka>('KAFKA_CLIENT');
    logger = module.get<Logger>(Logger);
    strategyFactory = module.get<PricingTypeStrategyFactory>(
      PricingTypeStrategyFactory,
    );
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('handleMessage', () => {
    it('should log the message and process it using the correct strategy', () => {
      const mockMessage = { pricingType: 'type1', data: 'some data' };
      const mockContext = {
        getTopic: jest.fn().mockReturnValue('some-topic'),
        getMessage: jest.fn(),
        getPartition: jest.fn(),
        getArgs: jest.fn(),
        getArgByIndex: jest.fn(),
        args: [],
      } as unknown as KafkaContext;
      const mockStrategy = {
        process: jest.fn().mockReturnValue('processed data'),
      };

      strategyFactory.getStrategy = jest.fn().mockReturnValue(mockStrategy);

      const result = appController.handleMessage(mockMessage, mockContext);

      expect(logger.log).toHaveBeenCalledWith(
        `Message received: ${JSON.stringify(
          mockMessage,
        )}, topic: ${mockContext.getTopic()}`,
      );
      expect(strategyFactory.getStrategy).toHaveBeenCalledWith(
        mockMessage.pricingType,
      );
      expect(mockStrategy.process).toHaveBeenCalledWith(mockMessage);
      expect(result).toBe('processed data');
    });
  });

  describe('publishMessage', () => {
    it('should emit the message to Kafka and log it', () => {
      const mockMessage = { some: 'data' };

      appController.publishMessage(mockMessage);

      expect(clientKafka.emit).toHaveBeenCalledWith(
        'shipping-methods-determined',
        mockMessage,
      );
      expect(logger.log).toHaveBeenCalledWith(
        `Message: ${JSON.stringify(
          mockMessage,
        )} publish to: shipping-methods-determined`,
      );
    });
  });

  describe('onModuleInit', () => {
    it('should subscribe to response of the topic', async () => {
      await appController.onModuleInit();
      expect(clientKafka.subscribeToResponseOf).toHaveBeenCalledWith(
        'shipping-methods-determined',
      );
    });
  });
});
