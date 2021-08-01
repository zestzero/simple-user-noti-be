import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './schemas/task.schema';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() createUserDto: CreateTaskDto) {
        await this.taskService.create(createUserDto);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.findById(id);
    }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.findAll();
    }
}
