import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdUser = new this.taskModel(createTaskDto);
    return createdUser.save();
  }

  async findById(userId: string): Promise<Task> {
    return this.taskModel.findById(userId);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find();
  }
}
