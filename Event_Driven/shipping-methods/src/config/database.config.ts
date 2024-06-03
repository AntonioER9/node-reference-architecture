import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CourierEntity } from 'src/entities/courier.entity';
import { DispatchTypeEntity } from 'src/entities/dispatch-type.entity';

export const dataBaseConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [DispatchTypeEntity, CourierEntity],
    synchronize: true,
};
