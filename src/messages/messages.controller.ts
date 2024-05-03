import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    this.messagesService = new MessagesService();
  }

  @Get()
  index() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  store(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
