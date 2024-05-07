import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  store(@Body() body: createUserDto) {
    return this.usersService.create(body.email, body.password);
  }
}
