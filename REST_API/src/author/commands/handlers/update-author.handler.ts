import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthorRepository } from '../../repository/author.repository';
import { UpdateAuthorCommand } from '../impl';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler
  implements ICommandHandler<UpdateAuthorCommand>
{
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(command: UpdateAuthorCommand) {
    const { id, updateAuthor } = command;
    const { date_of_birth } = updateAuthor;
    const dateOfBirthAuthor = new Date(date_of_birth);
    const dateNow = new Date();
    if (dateOfBirthAuthor > dateNow) {
      throw new BadRequestException(`Date of birth should not be future date`);
    }
    return await this.authorRepository.updateAuthor(id, updateAuthor);
  }
}
