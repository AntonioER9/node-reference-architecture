import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { couriersSeed } from 'seeds/couriers.seed';
import { Repository } from 'typeorm';
import { CourierEntity } from './entities/courier.entity';
import { DispatchTypeEntity } from './entities/dispatch-type.entity';
import { DispatchTypeCodeEnum } from './enum/dispatch-type-code.enum';
import { dispatchTypesSeed } from 'seeds/dispatch-types.seed';
import { CourierCodeEnum } from './enum/courier-code.enum';

@Injectable()
export class AppService implements OnModuleInit {
    constructor(
        @InjectRepository(CourierEntity)
        private courierRepository: Repository<CourierEntity>,
        @InjectRepository(DispatchTypeEntity)
        private dispatchTypeRepository: Repository<DispatchTypeEntity>,
    ) {}

    async onModuleInit() {
        await this.seedCouriers();
        await this.seedDispatchTypes();
        await this.seedRelations(
            CourierCodeEnum.PEDIDOSYA,
            DispatchTypeCodeEnum.RL_LAST_MILE,
        );
        await this.seedRelations(
            CourierCodeEnum.UBER,
            DispatchTypeCodeEnum.RL_LAST_MILE,
        );
        await this.seedRelations(
            CourierCodeEnum.UBER,
            DispatchTypeCodeEnum.SFS_LAST_MILE,
        );
        await this.seedRelations(
            CourierCodeEnum.RAPPI,
            DispatchTypeCodeEnum.SFS_LAST_MILE,
        );
    }

    async seedCouriers() {
        for (const courier of couriersSeed) {
            const result = await this.courierRepository.findOne({
                where: { code: courier.code },
            });

            if (!result) {
                const newDispatchType = this.courierRepository.create(courier);
                await this.courierRepository.save(newDispatchType);
            }
        }
    }

    async seedDispatchTypes() {
        for (const dispatchType of dispatchTypesSeed) {
            const result = await this.dispatchTypeRepository.findOne({
                where: { code: dispatchType.code },
            });

            if (!result) {
                const newDispatchType =
                    this.dispatchTypeRepository.create(dispatchType);
                await this.dispatchTypeRepository.save(newDispatchType);
            }
        }
    }

    async seedRelations(
        courierCode: CourierCodeEnum,
        dispatchTypeCode: DispatchTypeCodeEnum,
    ) {
        const courier = await this.courierRepository.findOne({
            where: { code: courierCode },
            relations: { dispatchTypes: true },
        });

        const dispatchType = await this.dispatchTypeRepository.findOne({
            where: { code: dispatchTypeCode },
        });

        courier.dispatchTypes.push(dispatchType);
        await this.courierRepository.save(courier);
    }
}
