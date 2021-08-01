import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let userController: UserController;
    const mockUserService = {
        create: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

    describe('create', () => {
        it('should call UserService.create correctly"', () => {
            const req: CreateUserDto = {
                firstname: 'firstname',
                lastname: 'lastname',
                position: 'position',
            };
            userController.create(req);
            expect(mockUserService.create).toHaveBeenCalledWith(req);
        });
    });

    describe('getUserById', () => {
        it('should call UserService.fineOne correctly"', () => {
            userController.getUserById('1234');
            expect(mockUserService.findById).toHaveBeenCalledWith('1234');
        });
    });

    describe('getAllUsers', () => {
        it('should call UserService.findAll correctly"', () => {
            userController.getAllUsers();
            expect(mockUserService.findAll).toHaveBeenCalled();
        });
    });
});
