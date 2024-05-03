import {
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.facilities)
  users: User[];

  @OneToMany(() => Location, (location) => location.facility, {
    cascade: true
  })
  locations: Location[];
}