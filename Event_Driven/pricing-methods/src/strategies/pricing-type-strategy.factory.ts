import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';
import PricingTypeStrategy from './pricing-type.strategy';

export default class PricingTypeStrategyFactory {
  private strategies = new Map<PricingTypeCodeEnum, PricingTypeStrategy>();

  addStrategy(pricingType: PricingTypeCodeEnum, strategy: PricingTypeStrategy) {
    this.strategies.set(pricingType, strategy);
    console.log(`${pricingType} strategy loaded!`);
  }

  getStrategy(pricingType: PricingTypeCodeEnum) {
    return this.strategies.get(pricingType);
  }
}
