import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAuthorNameQuery } from '../impl/get-author-name.query';
import { AuthorRepository } from '../../repository/author.repository';

@QueryHandler(GetAuthorNameQuery)
export class GetAuthorHandlerName implements IQueryHandler<GetAuthorNameQuery> {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(query: GetAuthorNameQuery) {
    const { first_name, last_name } = query;
    return this.authorRepository.getAuthorName(first_name, last_name);
  }
}
