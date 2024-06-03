import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nasa_images_search_cache')
export class NasaImagesSearchCache {
  @PrimaryColumn({ type: 'text' })
  query: string;

  @Column({ type: 'text' })
  json_response: string;

  @Column({ type: 'text' })
  expires_at: string;

  @CreateDateColumn({ type: 'text' })
  created_at: string;

  @UpdateDateColumn({ type: 'text' })
  updated_at: string;
}
