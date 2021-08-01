import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('UserController', () => {
    let taskController: TaskController;
    const mockTaskService = {
        create: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
            providers: [
                {
                    provide: TaskService,
                    useValue: mockTaskService,
                },
            ],
        }).compile();

        taskController = app.get<TaskController>(TaskController);
    });

    describe('create', () => {
        it('should call TaskService.create correctly"', () => {
            const req: CreateTaskDto = {
                title: 'title',
                assignees: '1234',
                completed: false,
            };
            taskController.create(req);
            expect(mockTaskService.create).toHaveBeenCalledWith(req);
        });
    });

    describe('getTaskById', () => {
        it('should call TaskService.fineOne correctly"', () => {
            taskController.getTaskById('1234');
            expect(mockTaskService.findById).toHaveBeenCalledWith('1234');
        });
    });

    describe('getAllTasks', () => {
        it('should call TaskService.findAll correctly"', () => {
            taskController.getAllTasks();
            expect(mockTaskService.findAll).toHaveBeenCalled();
        });
    });
});
