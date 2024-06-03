import { DispatchTypeCodeEnum } from 'src/enum/dispatch-type-code.enum';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourierEntity } from './courier.entity';

@Entity({ name: 'dispatch_type' })
export class DispatchTypeEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    code: DispatchTypeCodeEnum;

    @Column()
    description: string;

    @Column()
    enabled: boolean;

    @ManyToMany(() => CourierEntity, (courier) => courier.dispatchTypes)
    @JoinTable({
        name: 'dispatch_type_courier',
        joinColumns: [{ name: 'dispatch_type_id', referencedColumnName: 'id' }],
        inverseJoinColumns: [
            { name: 'courier_id', referencedColumnName: 'id' },
        ],
    })
    couriers?: CourierEntity[];
}
