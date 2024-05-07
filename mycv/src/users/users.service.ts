import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async update(id: number, body: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, body);
    return this.repo.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
