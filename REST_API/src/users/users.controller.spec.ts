import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './core';
import { GetUserQuery } from './queries/impl';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  let queryBusService: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    queryBusService = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentUser', () => {
    it('should return user in accordance with JWT', async () => {
      const mockUserId = 'test-id';

      const mockUser: User = {
        IS_ACTIVE: true,
        USER_EMAIL: 'test@email.com',
        USER_FIRSTNAME: 'John',
        USER_LASTNAME: 'Doe',
        USER_ID: mockUserId,
      };

      const mockUserToJSONString = JSON.stringify(mockUser);

      jest
        .spyOn(queryBusService, 'execute')
        .mockImplementation(() => Promise.resolve(mockUser));

      expect(await controller.getCurrentUser(mockUserId)).toBe(
        mockUserToJSONString,
      );

      expect(queryBusService.execute).toHaveBeenCalledTimes(1);
      expect(queryBusService.execute).toHaveBeenCalledWith(
        new GetUserQuery(mockUserId),
      );
    });
  });
});
