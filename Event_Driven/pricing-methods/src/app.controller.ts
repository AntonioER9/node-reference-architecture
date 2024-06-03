import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import PricingTypeStrategyFactory from './strategies/pricing-type-strategy.factory';

const topic = 'shipping-methods-determined';
@Controller()
export default class AppController implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CLIENT') private client: ClientKafka,
    private readonly strategyFactory: PricingTypeStrategyFactory,
    private readonly logger: Logger,
  ) {}

  @MessagePattern(topic)
  handleMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    this.logger.log(
      `Message received: ${JSON.stringify(
        message,
      )}, topic: ${context.getTopic()}`,
    );
    const strategy = this.strategyFactory.getStrategy(message.pricingType);
    return strategy.process(message);
  }

  @Post()
  publishMessage(@Body() message: any) {
    this.client.emit(topic, message);
    this.logger.log(`Message: ${JSON.stringify(message)} publish to: ${topic}`);
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf(topic);
  }
}
