import { IsNotEmpty, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  @IsString()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
