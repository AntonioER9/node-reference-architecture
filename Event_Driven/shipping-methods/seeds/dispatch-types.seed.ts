import { DispatchTypeEntity } from 'src/entities/dispatch-type.entity';
import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';

export const dispatchTypesSeed: DispatchTypeEntity[] = [
    {
        description: 'Despacho a Domicilio',
        code: DispatchTypeCodeEnum.SFS_LAST_MILE,
        enabled: true
    },
    {
        description: 'Devolución',
        code: DispatchTypeCodeEnum.RL_LAST_MILE,
        enabled: true
    },
];
