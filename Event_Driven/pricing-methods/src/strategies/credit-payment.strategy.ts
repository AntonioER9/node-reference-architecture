import { Inject, Injectable, Logger } from '@nestjs/common';
import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';
import PricingTypeStrategy from './pricing-type.strategy';
import PricingTypeStrategyFactory from './pricing-type-strategy.factory';
import OrderPricedDto from 'src/dto/order-priced.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export default class CreditPaymentStrategy extends PricingTypeStrategy {
  constructor(
    private readonly strategyFactory: PricingTypeStrategyFactory,
    @Inject('KAFKA_CLIENT') readonly client: ClientKafka,
    readonly logger: Logger,
  ) {
    super(client, logger);
    this.strategyFactory.addStrategy(this.pricingTypeCode, this);
  }

  pricingTypeCode = PricingTypeCodeEnum.CREDIT_PAYMENT;

  public process(message: OrderPricedDto) {
    console.log('Process CREDIT_PAYMENT Strategy');

    const pricingMessage: OrderPricedDto = {
      pricingType: this.pricingTypeCode,
      ...message,
    };
    this.sendToOrders(pricingMessage);
  }
}
