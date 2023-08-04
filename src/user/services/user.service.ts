import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserInterface } from '../interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER')
    private readonly userRepository: UserInterface,
  ) {}
 

  async getUser(email: string){
    
    return await this.userRepository.getUser(email);
  }
  
  async getUsers(){
    
    return await this.userRepository.getUsers();
  }

  async createUserFromJsonFile() {
    
    return await this.userRepository.createUserFromJsonFile();
  }

  async punishmentProcessor(punishmentProcessorInput){
    console.log(punishmentProcessorInput);
    
    return await this.userRepository.punishmentProcessor(punishmentProcessorInput);
  }

 async getUserPunishment(email){
  return await this.userRepository.getUserPunishment(email);
 };
}