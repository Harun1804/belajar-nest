import { Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('cat')
export class CatController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post()
  @HttpCode(201)
  store(): string {
    return 'This action adds a new cat';
  }
}
