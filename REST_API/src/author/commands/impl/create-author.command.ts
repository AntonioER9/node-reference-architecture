import { CreateAuthorDTO } from '../../dto';

export class AddAuthorCommand {
  constructor(public readonly createAuthor: CreateAuthorDTO) {}
}
