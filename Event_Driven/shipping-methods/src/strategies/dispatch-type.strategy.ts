import { Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import OrderPricedDto from 'src/dto/order-priced.dto';
import { CourierEntity } from 'src/entities/courier.entity';
import { DispatchTypeEntity } from 'src/entities/dispatch-type.entity';
import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';
import { Repository } from 'typeorm';

export default abstract class DispatchTypeStrategy {
    constructor(
        readonly client: ClientKafka,
        readonly logger: Logger,
        readonly dispatchTypeRepository: Repository<DispatchTypeEntity>,
    ) {}
    protected pricingTopic: string = 'shipping-methods-determined';

    public abstract dispatchTypeCode: DispatchTypeCodeEnum;
    public abstract process(message: any): void;
    public sendToPricing(message: OrderPricedDto) {
        this.client.emit(this.pricingTopic, message);
        this.logger.log(
            `Message: ${JSON.stringify(message)} publish to: ${this.pricingTopic}`,
        );
    }
    public async getCouriersByDispatchType(): Promise<CourierEntity[]> {
        const dispatchTypes: DispatchTypeEntity =
            await this.dispatchTypeRepository.findOne({
                where: { code: this.dispatchTypeCode },
                relations: { couriers: true },
            });
        return dispatchTypes.couriers;
    }

    public getCourierByPrice(
        couriers: CourierEntity[],
        priceAttribute: string,
    ): CourierEntity {
        const courierSelected = couriers.reduce((min, courier) => {
            if (min === null || courier[priceAttribute] < min[priceAttribute]) {
                return courier;
            } else {
                return min;
            }
        }, null);
        this.logger.log(
            `Courier: ${courierSelected.description} selected, with price: ${courierSelected[priceAttribute]}`,
        );
        return courierSelected;
    }
}
