import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { get } from 'lodash';

@Injectable()
export class AuthService {
  public constructor(
    
  ){}

  public validateUser(payload){
    console.log("payload:", payload);
    return true;
  }

  public async login(credentials: LoginDto): Promise<any> {
    try {
      //const commandResponse = await this.coreService.login(credentials);
      const commandResponse = {
        data: {
          user: {
            status: true,
            language: "es-ES",
            address: "N/A",
            phone: "123123",
            last_name: "abalan",
            first_name: "francisco",
            description: "N/A",
            timezone: "America/Santiago",
            country: "CL",
            avatar: "assets/images/default-avatar.png",
            name: "N/A",
            username: "francisco.abalan@agranimo.com",
            email: "francisco.abalan@agranimo.com",
            hashed_password: "$2b$10$YaDDFiX3YYiF5AeOAzLopuQp4nvSeR/dSLAd1NG2dOBvexesxVGue",
            role: "ADMIN",
            messages: [],
            company_id: "5893cef01f7231eb6932fc11",
            createdAt: "2021-09-29T10:20:07.635Z",
            active: true,
            generatedRandomKey: "G0_R888ZDVaMiKwedfxm5",
            updatedAt: "2023-01-18T12:25:28.915Z",
            id: "61543dd73388b2001184a8ae"
          },
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyYW5jaXNjby5hYmFsYW5AYWdyYW5pbW8uY29tIiwicm9sZSI6IkFETUlOIiwic3ViIjoiNjE1NDNkZDczMzg4YjIwMDExODRhOGFlIiwiaWF0IjoxNzA3OTM0Mzc3LCJleHAiOjE3MDg1MzkxNzd9.dTb1OJEn06dyw7sSp-pZjJiQpdfwxFN6qi4Wdvne3Q8"
        },
        error: null,
        message: "Valid query",
        success: true
      }
      return get(commandResponse, 'data', null);
    } catch (error) {
      console.log("Login Error=", error);
      throw new Error('INVALID_AUTH_SERVICE_LOGIN');
    }
  }
}
