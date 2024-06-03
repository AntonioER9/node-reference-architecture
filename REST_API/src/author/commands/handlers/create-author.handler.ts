import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthorRepository } from '../../repository/author.repository';
import { AddAuthorCommand } from '../impl';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(AddAuthorCommand)
export class AddAuthorHandler implements ICommandHandler<AddAuthorCommand> {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async execute(command: AddAuthorCommand) {
    const { createAuthor } = command;
    const { date_of_birth } = createAuthor;
    const dateOfBirthAuthor = new Date(date_of_birth);
    const dateNow = new Date();
    if (dateOfBirthAuthor > dateNow) {
      throw new BadRequestException(`Date of birth should not be future date`);
    }

    return await this.authorRepository.createAuthor(createAuthor);
  }
}
