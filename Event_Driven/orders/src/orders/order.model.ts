import { Column, Table, Model, HasMany, HasOne } from 'sequelize-typescript';
import { OrderItems } from './order-items.model';
import { ShippingAddress } from './shipping-address.model';
@Table({
  tableName: 'orders',
})
export class Order extends Model {
  @Column
  numberOfItems: number;
  @Column
  total: number;
  @Column
  transactionId: string;
  @Column
  paymentMethod: string;
  @Column
  paymentConfirmationCode: string;
  @Column
  status: string;
  @HasMany(() => OrderItems)
  orderItems: OrderItems[];
  @HasOne(() => ShippingAddress)
  shippingAddress: ShippingAddress;
}
