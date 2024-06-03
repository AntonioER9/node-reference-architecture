import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'blob', unique: true })
  USER_ID: any;

  @Column({ unique: true })
  USER_EMAIL: string;

  @Column()
  USER_FIRSTNAME: string;

  @Column()
  USER_LASTNAME: string;

  @Column({ default: true })
  IS_ACTIVE: boolean;
}
