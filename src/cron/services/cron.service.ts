import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { RepositoryEnum } from 'src/common/const/repository.enum';
import { CronRepoInterface } from '../interface/cron.interface';

@Injectable()
export class CronService {
  constructor(
    @Inject(RepositoryEnum.CRON)
    private readonly cronRepository: CronRepoInterface,
  ) {}
  @Cron('0 0 10 * * 1-5')
  async createUsers() {
    return await this.cronRepository.sendEmail();
  }
}
