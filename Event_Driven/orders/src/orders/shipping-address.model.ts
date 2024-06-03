import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { Order } from './order.model';
@Table({
  tableName: 'shipping_addresses',
})
export class ShippingAddress extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  @ForeignKey(() => Order)  
  order_id: number;

  @Column
  address: string;

  @Column
  address2: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  zip: string;

  @Column
  phone: string;

  @Column
  trackingCode: string;
}
