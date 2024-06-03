import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuthorsQuery } from '../impl/get-author.query';
import { AuthorRepository } from '../../repository/author.repository';

@QueryHandler(GetAuthorsQuery)
export class GetAuthorsHandler implements IQueryHandler<GetAuthorsQuery> {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute() {
    console.log('Get all authors');
    return this.authorRepository.getAllAuthor();
  }
}
