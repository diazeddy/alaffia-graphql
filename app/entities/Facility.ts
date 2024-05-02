import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';
import { Location } from './Location';

@Entity()
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @ManyToMany(() => User)
  users: User[];

  @OneToMany(() => Location, (location) => location.facility)
  locations: Location[];
}