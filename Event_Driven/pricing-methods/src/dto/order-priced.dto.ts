import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';

export default class OrderPricedDto {
  createdAt: number;
  pricingType: PricingTypeCodeEnum;
  orderCode: string;
}
