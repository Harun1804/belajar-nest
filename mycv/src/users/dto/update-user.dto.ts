import { IsOptional, IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}
