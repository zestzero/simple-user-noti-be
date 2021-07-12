import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
