import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql/graphql.module';
import { Neo4jModule } from 'sgnm-neo4j/dist';
import { MailerModule } from '@nestjs-modules/mailer';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Neo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('NEO4J_HOST'),
        password: configService.get('NEO4J_PASSWORD'),
        port: configService.get('NEO4J_PORT'),
        scheme: configService.get('NEO4J_SCHEME'),
        username: configService.get('NEO4J_USERNAME'),
        database: configService.get('NEO4J_DATABASE'),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAILER_HOST'),
          secure: false,
          auth: {
            user: config.get('MAILER_USER'),
            pass: config.get('MAILER_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    GraphqlModule,
    UserModule,
    CronModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
