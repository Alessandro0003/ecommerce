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
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return access token',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        accessToken: { type: 'string' },
        sessionToken: { type: 'string' },
        expiresIn: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credentials invalid' })
  @Throttle({ short: { limit: 5, ttl: 60000 } }) // 5 tentativas por minuto
  async login(@Body() loginDto: LoginDto) {
    const signIn = await this.authService.login(loginDto);
    return signIn;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User Register',
    description: 'Register a new user and return access token',
  })
  @ApiResponse({ status: 201, description: 'Successful register' })
  @ApiResponse({ status: 400, description: 'Invalid registration data' })
  @ApiResponse({ status: 409, description: 'E-mail already registered' })
  @Throttle({ medium: { limit: 3, ttl: 60000 } }) // 3 tentativas por minuto
  async register(@Body() registerDto: RegisterDto) {
    const signUp = await this.authService.register(registerDto);
    return signUp;
  }
}
