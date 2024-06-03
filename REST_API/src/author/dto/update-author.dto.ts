import { CreateAuthorDTO } from './create-author.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateAuthorDTO extends PartialType(CreateAuthorDTO) {}
