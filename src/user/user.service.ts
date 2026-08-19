import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PsUser } from './dto/ps-user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { PaginationMeta } from '../common/interfaces/api-response.interface';
import { paginateWrapper } from '../common/helpers/pagination-wrapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = this.userRepository.create(createUserDto);
    return this.userRepository.save(userData);
  }

  async findAll(
    ps: PsUser,
  ): Promise<{ data: User[]; pagination: PaginationMeta }> {
    const page = ps.page || 1;
    const limit = ps.limit || 10;
    const keyword = ps.keyword || '';

    const whereCondition: FindOptionsWhere<User>[] | undefined = keyword
      ? [{ fullname: Like(`%${keyword}%`) }, { email: Like(`%${keyword}%`) }]
      : undefined;

    const [data, totalData] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: whereCondition,
    });

    return paginateWrapper(data, page, limit, totalData);
  }

  async findOne(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const userData = this.userRepository.merge(existingUser, updateUserDto);
    return this.userRepository.save(userData);
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(existingUser);
  }
}
