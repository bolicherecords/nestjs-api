import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CoreUserService } from 'src/core/core-user.service';
import { JwtService } from '@nestjs/jwt';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly coreUserService: CoreUserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ){}

  async login(userDto): Promise<{ accessToken: string }> {
    const payload = { 
      sub: get(userDto, 'id', null),
      email: get(userDto, 'email', null),
      role: get(userDto, 'role', null),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(userDto): Promise<any> {
    const user = await this.coreUserService.createOne(userDto);
    return user;
  }

  async validateCredentials(email: string, password: string): Promise<any> {
    const user = await this.coreUserService.findOne({email});
    if (user && this.validPassword(user, password)) {
      return user;
    }
    return null;
  }

  private validPassword(user, password) {
    const validPassword = compareSync(password, user.password);
    return validPassword ? user : null;
  }

  async validateUser(email: string): Promise<any>{
    const user = await this.coreUserService.findOne({email});
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verify(token: string){
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const email = get(decoded, 'email', null);
    const user = await this.coreUserService.findOne({email});
    if (!user) {
      throw new Error('Unable to get the user from decoded Token.');
    }
    return user;
  }
}
