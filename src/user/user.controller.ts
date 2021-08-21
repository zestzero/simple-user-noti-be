import { Body, Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'user_create' })
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findById(id);
    }

    @MessagePattern({ cmd: 'user_getAll' })
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }
}
