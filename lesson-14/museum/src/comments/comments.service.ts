import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async create(exhibitId: number, userId: number, createCommentDto: CreateCommentDto) {
    const comment = this.commentRepo.create({
      text: createCommentDto.text,
      user: { id: userId },
      exhibit: { id: exhibitId }
    });
    return this.commentRepo.save(comment);
  }

  findAllByExhibit(exhibitId: number) {
    return this.commentRepo.find({
      where: { exhibit: { id: exhibitId } },
      relations: ['user']
    });
  }

  async remove(commentId: number, userId: number) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
      relations: ['user']
    });
    
    if (!comment) throw new NotFoundException('Comment does not exist');
    if (comment.user.id !== userId) throw new ForbiddenException('You can delete only yours comments');
    
    return this.commentRepo.remove(comment);
  }
}