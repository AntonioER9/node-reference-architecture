import { CourierEntity } from 'src/entities/courier.entity';
import { CourierCodeEnum } from 'src/enum/courier-code.enum';
import { dispatchTypesSeed } from './dispatch-types.seed';
import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';

export const couriersSeed: CourierEntity[] = [
    {
        code: CourierCodeEnum.RAPPI,
        description: 'Courier Rappi',
        enabled: true,
        shippingPrice: 5,
        returnPrice: 7
    },
    {
        code: CourierCodeEnum.UBER,
        description: 'Courier Uber',
        enabled: true,
        shippingPrice: 6,
        returnPrice: 8
    },
    {
        code: CourierCodeEnum.PEDIDOSYA,
        description: 'Courier PedidosYA',
        enabled: true,
        shippingPrice: 7,
        returnPrice: 6
    },
];
