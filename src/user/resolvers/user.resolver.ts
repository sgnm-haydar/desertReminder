import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import {
  CreateUserInput,
  PunishmentProcessorInput,
  User,
} from 'src/graphql/gql-types';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUser')
  async getUser(@Args('email') email: string, @Context() context) {
    return this.userService.getUser(email);
  }

  @Query('getUsers')
  async getUsers(@Context() context) {
    return this.userService.getUsers();
  }

  @Mutation('createUser')
  async createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
    @Context() context,
  ) {
    const headers = context.req.headers;
    return await this.userService.createUser(createUserInput);
  }

  @Mutation('createUserFromJson')
  async createUserFromJson(@Context() context) {
    const headers = context.req.headers;
    return await this.userService.createUserFromJsonFile();
  }

  @Mutation('punishmentProcessor')
  async punishmentProcessor(
    @Args('punishmentProcessorInput')
    punishmentProcessorInput: PunishmentProcessorInput,
    @Context() context,
  ) {

    return await this.userService.punishmentProcessor(punishmentProcessorInput);
  }

  @ResolveField('punishment')
  async getTypesMaterial(
    @Parent() user: User,
    @Context() context,
  ): Promise<any> {
    return await this.userService.getUserPunishment(user.properties.email);
  }
}
