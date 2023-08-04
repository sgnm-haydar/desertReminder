import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronRepoInterface } from './cron.interface';

@Injectable()
export class CronService implements OnApplicationBootstrap {
  constructor(
    @Inject('CRON')
    private readonly cronRepository: CronRepoInterface,
  ) {}

  async onApplicationBootstrap() {
    console.log('fonksiyon çalıştı');
  }

 

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  createUsers() {
    return this.cronRepository.sendEmail();
  }

}
