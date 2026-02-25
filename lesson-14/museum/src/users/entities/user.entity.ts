import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from '../../exhibits/entities/exhibit.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'username123', description: 'Name' })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({ type: () => [Exhibit], description: 'Exhibits list' })
  exhibits: Exhibit[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}