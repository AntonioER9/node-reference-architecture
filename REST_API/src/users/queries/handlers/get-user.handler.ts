import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/core';
import { Repository } from 'typeorm';
import { GetUserQuery } from '../impl';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery): Promise<any> {
    return await this.usersRepository.findOneBy({ USER_ID: query.userId });
  }
}
