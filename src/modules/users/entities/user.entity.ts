import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Url } from '../../urls/entities/url.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
