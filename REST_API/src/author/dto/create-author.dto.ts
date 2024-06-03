import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthorDTO {
  @ApiProperty()
  @IsString()
  readonly first_name: string;

  @ApiProperty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({
    example: '1965/07/31',
  })
  @IsString()
  readonly date_of_birth: string;
}
