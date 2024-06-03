import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppController from './app.controller';
import { dataBaseConfig } from './config/database.config';
import { kafkaConfig } from './config/kafka.config';
import DispatchTypeStrategyFactory from './strategies/dispatch-type-strategy.factory';
import RlLastMileStrategy from './strategies/rl-last-mile.strategy';
import SfsLastMileStrategy from './strategies/sfs-last-mile.strategy';
import { DispatchTypeEntity } from './entities/dispatch-type.entity';
import { CourierEntity } from './entities/courier.entity';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataBaseConfig),
        TypeOrmModule.forFeature([DispatchTypeEntity, CourierEntity]),
        ClientsModule.register([
            {
                name: 'KAFKA_CLIENT',
                ...kafkaConfig,
            },
        ]),
    ],
    providers: [
        Logger,
        DispatchTypeStrategyFactory,
        RlLastMileStrategy,
        SfsLastMileStrategy,
        AppService,
    ],
    controllers: [AppController],
})
export class AppModule {}
