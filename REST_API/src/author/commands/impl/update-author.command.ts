import { UpdateAuthorDTO } from '../../dto';

export class UpdateAuthorCommand {
  constructor(
    public readonly id: number,
    public readonly updateAuthor: UpdateAuthorDTO,
  ) {}
}
