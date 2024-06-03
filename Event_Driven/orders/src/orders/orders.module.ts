import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderItems } from './order-items.model';
import { ShippingAddress } from './shipping-address.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([Order, OrderItems, ShippingAddress]),
    ClientsModule.registerAsync([
      {
        name: 'orders',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID'),
              brokers: configService.get<string>('KAFKA_BROKERS').split(','),
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_CONSUMER_GROUP_ID'),
            }
          },
        }),
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
