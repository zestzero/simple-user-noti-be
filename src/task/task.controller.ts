import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/task.dto';
import { Task } from './schemas/task.schema';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @MessagePattern({ cmd: 'task_create' })
    async create(createUserDto: CreateTaskDto) {
        return this.taskService.create(createUserDto);
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.taskService.findById(id);
    }

    @MessagePattern({ cmd: 'task_getAll' })
    async getAllTasks(): Promise<Task[]> {
        return this.taskService.findAll();
    }
}
