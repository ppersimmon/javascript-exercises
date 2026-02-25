import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Exhibit {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  image: string;

  @Column()
  @ApiProperty()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.exhibit, { cascade: true })
  comments: Comment[];
}