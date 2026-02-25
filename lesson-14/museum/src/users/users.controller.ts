import { Controller, Get, Post, Body, Query, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User was successfully registrated' })
  @ApiResponse({ status: 400, description: 'Incorrect data' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user by id, username' })
  @ApiResponse({ status: 201, description: 'User was found' })
  @ApiResponse({ status: 404, description: 'User was not found' })
  async findAll(@Query('id') id?: number, @Query('username') username?: string) {
    if (id) {
      const user = await this.usersService.findById(id);
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      return user;
    }
    
    if (username) {
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      const { password, ...result } = user;
      return result;
    }
    
    return this.usersService.findAll();
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({ status: 201, description: 'User info' })
  @ApiResponse({ status: 404, description: 'User was not found' })
  async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }
}