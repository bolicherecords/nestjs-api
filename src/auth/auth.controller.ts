import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({ status: 201, description: 'The login has been successfully.' })
  @ApiResponse({ status: 401, description: 'Bad Request.' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request): Promise<{ accessToken: string }> {
    const user = get(req, 'user', null);
    return await this.authService.login(user);
  }

  @ApiResponse({ status: 201, description: 'The signup has been successfully.' })
  @ApiResponse({ status: 401, description: 'Bad Request.' })
  @Post('signup')
  public async signup(@Body() params): Promise<any> {
    return await this.authService.signup(params);
  }
}
