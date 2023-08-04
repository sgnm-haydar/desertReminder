
import { Module } from '@nestjs/common';


import { CronRepository } from './cron.repository';

import { CronService } from './cron.service';
import { CronController } from './cron.controller';

@Module({
  imports: [],
  controllers: [CronController],
  providers: [
    CronService,

    {
      provide: 'CRON',
      useClass: CronRepository,
    },
  ],
  exports: [CronService],
})
export class CronModule {}
