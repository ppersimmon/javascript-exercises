import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'string', description: 'Description' })
  @IsString()
  @IsNotEmpty()
  text: string;
}