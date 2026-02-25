import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'Login' })
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;
}