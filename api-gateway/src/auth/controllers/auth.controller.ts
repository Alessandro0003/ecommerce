import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Throttle({ short: { limit: 5, ttl: 60000 } }) // 5 tentativas por minuto
  async login(@Body() loginDto: LoginDto) {
    const signIn = await this.authService.login(loginDto);
    return signIn;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User Register' })
  @ApiResponse({ status: 201, description: 'Successful register' })
  @ApiResponse({ status: 400, description: 'Invalid registration data' })
  @Throttle({ medium: { limit: 3, ttl: 60000 } }) // 3 tentativas por minuto
  async register(@Body() registerDto: RegisterDto) {
    const signUp = await this.authService.register(registerDto);
    return signUp;
  }
}
