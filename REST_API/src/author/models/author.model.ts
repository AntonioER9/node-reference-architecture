import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  author_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_birth: string;
}
