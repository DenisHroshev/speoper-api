import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../constants/roles.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role, default: Role.WORKER })
  role: Role;
}
