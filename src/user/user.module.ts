import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';
import { RepositoryEnum } from 'src/common/const/repository.enum';

@Module({
  providers: [
    UserResolver,
    UserService,
    {
      provide: RepositoryEnum.USER,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
