import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'username123', description: 'string' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'string' })
  password: string;
}