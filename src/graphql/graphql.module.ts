import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<any>({
      driver: ApolloDriver,
      typePaths: ['./../**/schema/*.gql'],
      definitions: {
        path: './src/graphql/gql-types.ts',
      },
      context: (args) => args,
      formatError: (error) => {
        const graphQLFormattedError = {
          message: error.extensions?.exception?.response?.message || error.message,
        };

        console.error(error);
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphqlModule {}
