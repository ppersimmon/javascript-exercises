import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, UseGuards, Req, Delete, Param, Query, Res } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { APP_CONSTANTS } from '../constants/constants';

@ApiTags('exhibits')
@Controller('api/exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new exhibit' })
  @ApiResponse({ status: 201, description: 'Exhibit has been created successfully' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        description: { type: 'string' },
      },
    },
  })
  create(@Body() body: { description: string }, @UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.exhibitsService.create(file, body.description, req.user.userId, req.user.username);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exhibits' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'page number', example: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'limit number', example: APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT })
  @ApiResponse({ status: 200, description: 'Exhibit list' })
  findAll(@Query('page') page: number = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
  @Query('limit') limit: number = APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT) {
    return this.exhibitsService.findAll(+page, +limit);
  }

  @Get('my-posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user exhibits' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: APP_CONSTANTS.PAGINATION.DEFAULT_PAGE })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT })
  @ApiResponse({ status: 200, description: 'User exhibits list' })
  findMyPosts(@Query('page') page: number = APP_CONSTANTS.PAGINATION.DEFAULT_PAGE,
  @Query('limit') limit: number = APP_CONSTANTS.PAGINATION.DEFAULT_LIMIT, @Req() req) {
    return this.exhibitsService.findMyPosts(req.user.userId, +page, +limit);
  }
  
  @Get('post/:id')
  @ApiOperation({ summary: 'Get exhibit by ID' })
  @ApiResponse({ status: 200, description: 'Exhibit info' })
  @ApiResponse({ status: 404, description: 'No such exhibit' })
  findOne(@Param('id') id: string) {
      return this.exhibitsService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete usesr exhibit ID' })
  @ApiResponse({ status: 200, description: 'Exhibit has been deleted successfully' })
  @ApiResponse({ status: 404, description: 'No exhibit with such ID' })
  remove(@Param('id') id: string, @Req() req) {
    return this.exhibitsService.remove(+id, req.user.userId);
  }
}