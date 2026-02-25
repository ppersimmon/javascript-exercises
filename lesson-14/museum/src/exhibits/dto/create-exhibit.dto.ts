import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateExhibitDto {
  @ApiProperty({ description: 'Description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}