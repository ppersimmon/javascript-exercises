import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  
  @Get()
  @ApiOperation({ summary: 'Get author info' })
  getAuthor() {
    return { 
      author: 'museum'
    };
  }
}