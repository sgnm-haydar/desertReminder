
import { Module } from '@nestjs/common';


import { CronRepository } from './repositories/cron.repository';

import { CronService } from './services/cron.service';
import { CronController } from './controller/cron.controller';
import { RepositoryEnum } from 'src/common/const/repository.enum';

@Module({
  imports: [],
  controllers: [CronController],
  providers: [
    CronService,

    {
      provide: RepositoryEnum.CRON,
      useClass: CronRepository,
    },
  ],
  exports: [CronService],
})
export class CronModule {}
