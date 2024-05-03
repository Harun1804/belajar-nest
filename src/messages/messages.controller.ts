import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  index() {}

  @Get('/:id')
  show() {}

  @Post()
  store() {}
}
