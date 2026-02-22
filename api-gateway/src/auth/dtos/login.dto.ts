import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@acme.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123456' })
  @IsString()
  @MinLength(6)
  password: string;
}
