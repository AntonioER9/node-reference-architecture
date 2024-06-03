import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Author } from './models/author.model';
import {
  AddAuthorCommand,
  DeleteAuthorCommand,
  UpdateAuthorCommand,
} from './commands/impl';
import { CreateAuthorDTO, UpdateAuthorDTO } from './dto';
import { GetAuthorNameQuery, GetAuthorsQuery } from './queries/impl';

@ApiTags('Authors')
@Controller('author')
export class AuthorController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createAuthor(@Body() createAuthor: CreateAuthorDTO): Promise<Author> {
    return this.commandBus.execute(new AddAuthorCommand(createAuthor));
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthor: UpdateAuthorDTO,
  ) {
    return this.commandBus.execute(new UpdateAuthorCommand(id, updateAuthor));
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
  })
  async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new DeleteAuthorCommand(id));
  }

  @Get('all')
  async findAllAuthors(): Promise<Author[]> {
    return this.queryBus.execute(new GetAuthorsQuery());
  }

  @Get()
  async findAuthorName(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
    // @Res() response,
  ): Promise<Author> {
    // const authorName = await this.queryBus.execute(
    //   new GetAuthorNameQuery(first_name, last_name),
    // );
    // if (!authorName) {
    //   return response.status(HttpStatus.NO_CONTENT).send();
    // }
    return this.queryBus.execute(new GetAuthorNameQuery(first_name, last_name));
  }
}
