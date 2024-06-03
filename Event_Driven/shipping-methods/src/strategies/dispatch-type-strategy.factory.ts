import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';
import DispatchTypeStrategy from './dispatch-type.strategy';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export default class DispatchTypeStrategyFactory {
    constructor(private readonly logger: Logger) {}

    private strategies = new Map<DispatchTypeCodeEnum, DispatchTypeStrategy>();

    addStrategy(
        dispatchType: DispatchTypeCodeEnum,
        strategy: DispatchTypeStrategy,
    ) {
        this.strategies.set(dispatchType, strategy);
        this.logger.log(`${dispatchType} strategy loaded!`);
    }

    getStrategy(dispatchType: DispatchTypeCodeEnum) {
        return this.strategies.get(dispatchType);
    }
}
