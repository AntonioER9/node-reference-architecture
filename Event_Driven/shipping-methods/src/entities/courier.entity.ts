import { CourierCodeEnum } from 'src/enum/courier-code.enum';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DispatchTypeEntity } from './dispatch-type.entity';

@Entity({ name: 'courier' })
export class CourierEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    code: CourierCodeEnum;

    @Column()
    description: string;

    @Column()
    enabled: boolean;

    @Column()
    shippingPrice: number;

    @Column()
    returnPrice: number;

    @ManyToMany(
        () => DispatchTypeEntity,
        (dispatchType) => dispatchType.couriers,
    )
    @JoinTable({
        name: 'dispatch_type_courier',
        joinColumns: [{ name: 'courier_id', referencedColumnName: 'id' }],
        inverseJoinColumns: [
            { name: 'dispatch_type_id', referencedColumnName: 'id' },
        ],
    })
    dispatchTypes?: DispatchTypeEntity[];
}
