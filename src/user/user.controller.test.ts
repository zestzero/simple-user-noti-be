import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let userController: UserController;
    const mockUserService = { findAll: jest.fn() };

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

    describe('findAll', () => {
        it('should call UserService.findAll correctly"', () => {
            userController.findAll();
            expect(mockUserService.findAll).toHaveBeenCalled();
        });
    });
});
