import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { Order } from './order.model';
@Table({
  tableName: 'order_items',
})
export class OrderItems extends Model {
  @Column
  @ForeignKey(() => Order)
  order_id: number;

  @Column
  product_id: number;

  @Column
  price: number;

  @Column
  quantity: number;

  @Column
  description: string;

  @Column
  size: string;

  @Column
  gender: string;
}
