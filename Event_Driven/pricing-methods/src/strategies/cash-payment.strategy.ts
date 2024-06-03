import { Inject, Injectable, Logger } from '@nestjs/common';
import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';
import PricingTypeStrategy from './pricing-type.strategy';
import PricingTypeStrategyFactory from './pricing-type-strategy.factory';
import { ClientKafka } from '@nestjs/microservices';
import OrderPricedDto from 'src/dto/order-priced.dto';

@Injectable()
export default class CashPaymentStrategy extends PricingTypeStrategy {
  constructor(
    private readonly strategyFactory: PricingTypeStrategyFactory,
    @Inject('KAFKA_CLIENT') readonly client: ClientKafka,
    readonly logger: Logger,
  ) {
    super(client, logger);
    this.strategyFactory.addStrategy(this.pricingTypeCode, this);
  }

  pricingTypeCode = PricingTypeCodeEnum.CASH_PAYMENT;

  public process(message: any) {
    console.log('Process CASH_PAYMENT Strategy');

    const pricingMessage: OrderPricedDto = {
      pricingType: this.pricingTypeCode,
      ...message,
    };
    this.sendToOrders(pricingMessage);
  }
}
