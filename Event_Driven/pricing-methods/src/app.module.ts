import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeEntity } from './entities/payment-type.entity';
import AppController from './app.controller';
import { dataBaseConfig } from './config/database.config';
import { kafkaConfig } from './config/kafka.config';
import PricingTypeStrategyFactory from './strategies/pricing-type-strategy.factory';
import CashPaymentStrategy from './strategies/cash-payment.strategy';
import CreditPaymentStrategy from './strategies/credit-payment.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataBaseConfig),
    TypeOrmModule.forFeature([PaymentTypeEntity]),
    ClientsModule.register([
      {
        name: 'SHIPPING_SERVICE',
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [
    Logger,
    PricingTypeStrategyFactory,
    CashPaymentStrategy,
    CreditPaymentStrategy,
  ],
  controllers: [AppController],
})
export class AppModule {}
