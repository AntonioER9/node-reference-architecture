import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { Author } from './models/author.model';
import { AuthorCommandHandlers } from './commands/handlers';
import { AuthorRepository } from './repository/author.repository';
import { AuthorQueryHandlers } from './queries/handlers';
@Module({
  imports: [TypeOrmModule.forFeature([Author]), CqrsModule],
  controllers: [AuthorController],
  providers: [
    ...AuthorCommandHandlers,
    ...AuthorQueryHandlers,
    AuthorRepository,
  ],
})
export class AuthorModule {}
