import { ClientKafka } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';
import OrderPricedDto from 'src/dto/order-priced.dto';

export default abstract class PricingTypeStrategy {
  constructor(readonly client: ClientKafka, readonly logger: Logger) {}

  protected pricingTopic = 'order-priced';

  public abstract pricingTypeCode: PricingTypeCodeEnum;
  public abstract process(message: any): void;

  public sendToOrders(message: OrderPricedDto) {
    this.client.emit(this.pricingTopic, message);
    this.logger.log(
      `Message: ${JSON.stringify(message)} publish to: ${this.pricingTopic}`,
    );
  }
}
