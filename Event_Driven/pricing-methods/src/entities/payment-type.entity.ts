import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment_type' })
export class PaymentTypeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  enabled: boolean;
}
