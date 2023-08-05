import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RepositoryEnum } from 'src/common/const/repository.enum';
import { CronRepoInterface } from '../interface/cron.interface';

@Injectable()
export class CronService  {
  constructor(
    @Inject(RepositoryEnum.CRON)
    private readonly cronRepository: CronRepoInterface,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async createUsers() {
    console.log('ÇALIŞTI');
    
    return await this.cronRepository.sendEmail();
  }
}
