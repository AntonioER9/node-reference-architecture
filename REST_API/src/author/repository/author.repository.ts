import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../models/author.model';
import { CreateAuthorDTO, UpdateAuthorDTO } from '../dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author) private repository: Repository<Author>,
  ) {}
  async createAuthor(createAuthor: CreateAuthorDTO) {
    const { first_name, last_name, date_of_birth } = createAuthor;
    const authorExist = await this.repository.findOneBy({
      first_name,
      last_name,
    });
    if (authorExist) {
      throw new BadRequestException(
        `Cannot insert author. Author with name '${first_name} ${last_name}' already exists`,
      );
    }
    const author = new Author();
    author.first_name = first_name;
    author.last_name = last_name;
    author.date_of_birth = date_of_birth;
    return this.repository.save(author);
  }

  async updateAuthor(id: number, updateAuthor: UpdateAuthorDTO) {
    const author = await this.repository.preload({
      author_id: id,
      ...updateAuthor,
    });
    if (!author) {
      throw new BadRequestException(
        `Cannot update author. Author with id '${id}' don't exist`,
      );
    }
    try {
      await this.repository.save(author);
      return author;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteAuthor(author_id: number) {
    const author = await this.repository.findOneBy({ author_id });
    if (!author) {
      throw new BadRequestException(
        `Cannot remove author. Author with id '${author_id}' don't exist`,
      );
    }
    return this.repository.remove(author);
  }
  async getAllAuthor() {
    return this.repository.find();
  }
  async getAuthorName(first_name: string, last_name: string) {
    const author = await this.repository.findOneBy({ first_name, last_name });
    return author ? author : {};
  }
}
