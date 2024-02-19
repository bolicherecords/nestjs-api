import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Strategy } from "passport-jwt"
import { get } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //TODO: Use env var for secretOrKey value
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'arbolitics_secret_key',
    });
  }

  async validate(validationPayload: {email: string, sub: string}): Promise<any> {
    console.log("JwtStrategy validationPayload=", validationPayload);
    const email = get(validationPayload, 'email', null)
    return await this.authService.validateUser(email);
  }
}
