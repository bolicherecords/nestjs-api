import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
