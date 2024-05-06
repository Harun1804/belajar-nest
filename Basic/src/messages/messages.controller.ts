import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(protected messagesService: MessagesService) {}

  @Get()
  index() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Post()
  store(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }
}
