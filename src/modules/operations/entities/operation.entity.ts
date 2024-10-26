import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OperationTypesEnum } from '../constants/operation-types.enum';
import { Transport } from '../../transports/entitites/transport.entity';

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ type: 'decimal' })
  latitude: number;

  @Column({ type: 'decimal' })
  longitude: number;

  @Column({ enum: OperationTypesEnum })
  type: OperationTypesEnum;

  @Column({ nullable: true })
  photoUrl: string;

  @ManyToMany(() => Transport)
  @JoinTable()
  transports: Transport[];
}
