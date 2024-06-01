/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  
    getUserProfile(){
        return {
           a:  'user profile'
        }
    }

}
