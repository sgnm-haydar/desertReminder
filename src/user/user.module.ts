import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers:
    [UserResolver,
      UserService,
      { 
        provide: 'USER', 
        useClass: UserRepository,
      },]
})
export class UserModule { }
