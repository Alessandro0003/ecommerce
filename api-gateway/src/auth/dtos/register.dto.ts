import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  SELLER = 'seller',
}

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@acme.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'user',
    enum: ['user', 'admin', 'seller'],
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: Roles = Roles.USER;
}
