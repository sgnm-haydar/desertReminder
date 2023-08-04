import {  Controller, Get, } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { CronService } from './cron.service';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Get('')
  createApplicationGroups() {
    return this.cronService.createUsers();
  }
}