import { PricingTypeCodeEnum } from 'src/enum/pricing-type-code.enum';

export const paymentTypesSeed = [
  {
    description: 'Pago al cash',
    code: PricingTypeCodeEnum.CASH_PAYMENT,
    enabled: true,
  },
  {
    description: 'Pago al crédito',
    code: PricingTypeCodeEnum.CREDIT_PAYMENT,
    enabled: true,
  },
];
