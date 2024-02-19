import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CoreUserService {
  constructor(
    @Inject('CORE') private coreClient: ClientProxy,
  ) {}

  public async findOne(userDto): Promise<any> {
    try {
      const result = await lastValueFrom(
        this.coreClient.send<any>({ cmd: 'users/findOne' }, userDto),
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}
