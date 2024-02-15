import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'The login has been successfully.' })
  @ApiResponse({ status: 401, description: 'Bad Request.' })
  @Post('login')
  public async login(@Body() credentials: LoginDto): Promise<any> {
    return this.authService.login(credentials);
  }
}
