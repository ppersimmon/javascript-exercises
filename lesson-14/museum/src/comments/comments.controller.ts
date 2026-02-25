import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('api/exhibits/:exhibitId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment' })
  @ApiResponse({ status: 201, description: 'Commment has been added successfully' })
  create(@Param('exhibitId') exhibitId: string, @Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(+exhibitId, req.user.userId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get comments' })
  @ApiResponse({ status: 200, description: 'Comments list' })
  findAll(@Param('exhibitId') exhibitId: string) {
    return this.commentsService.findAllByExhibit(+exhibitId);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200, description: 'Comment has been deleted' })
  remove(@Param('commentId') commentId: string, @Req() req) {
    return this.commentsService.remove(+commentId, req.user.userId);
  }
}
