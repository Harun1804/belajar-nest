import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  index() {}

  @Get('/:id')
  show(@Param('id') id: string) {
    console.log(id);
  }

  @Post()
  store(@Body() body: CreateMessageDto) {
    console.log(body);
  }
}
