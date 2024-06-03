import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthorRepository } from '../../repository/author.repository';
import { DeleteAuthorCommand } from '../impl';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler
  implements ICommandHandler<DeleteAuthorCommand>
{
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(command: DeleteAuthorCommand) {
    const { author_id } = command;
    return await this.authorRepository.deleteAuthor(author_id);
  }
}
