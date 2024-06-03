import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTypeEntity } from './entities/payment-type.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly clientKafka: ClientKafka,
    @InjectRepository(PaymentTypeEntity)
    private paymentTypeRepository: Repository<PaymentTypeEntity>,
  ) {}

  @MessagePattern('shipping-methods-determined')
  async handleMessage(@Payload() data: any) {
    console.log('Mensaje recibido:', data);
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('shipping-methods-determined');
  }
}
