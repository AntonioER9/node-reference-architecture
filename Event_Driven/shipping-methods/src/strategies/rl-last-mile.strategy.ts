import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import OrderCreatedDto from 'src/dto/order-created.dto';
import OrderPricedDto from 'src/dto/order-priced.dto';
import { DispatchTypeEntity } from 'src/entities/dispatch-type.entity';
import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';
import { Repository } from 'typeorm';
import DispatchTypeStrategyFactory from './dispatch-type-strategy.factory';
import DispatchTypeStrategy from './dispatch-type.strategy';

@Injectable()
export default class RlLastMileStrategy extends DispatchTypeStrategy {
    constructor(
        private readonly strategyFactory: DispatchTypeStrategyFactory,
        @Inject('KAFKA_CLIENT') readonly client: ClientKafka,
        readonly logger: Logger,
        @InjectRepository(DispatchTypeEntity)
        readonly dispatchTypeRepository: Repository<DispatchTypeEntity>,
    ) {
        super(client, logger, dispatchTypeRepository);
        this.strategyFactory.addStrategy(this.dispatchTypeCode, this);
    }

    dispatchTypeCode = DispatchTypeCodeEnum.RL_LAST_MILE;

    public async process(message: OrderCreatedDto) {
        this.logger.log('Process RlLastMile Strategy');

        const couriers = await this.getCouriersByDispatchType();
        const courierSelected = this.getCourierByPrice(couriers, 'returnPrice');

        const pricingMessage: OrderPricedDto = {
            deliveryPrice: courierSelected.returnPrice,
            ...message,
        };
        this.sendToPricing(pricingMessage);
    }
}
