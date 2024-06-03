import { IsString } from 'class-validator';

export class CreateShippingAddressDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  address: string;
  @IsString()
  zip: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  phone: string;
}
