import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PaymentTypeEntity } from 'src/entities/payment-type.entity';

export const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [PaymentTypeEntity],
  synchronize: true,
};
