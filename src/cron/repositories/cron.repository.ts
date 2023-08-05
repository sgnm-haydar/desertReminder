/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Neo4jService } from 'sgnm-neo4j/dist';
import { MailerService } from '@nestjs-modules/mailer';
import { CronRepoInterface } from '../interface/cron.interface';
import { Neo4jLabelEnum } from 'src/common/const/neo4j.label.enum';
import { RelationNameEnum } from 'src/common/const/relation.name.enum';

const moment = require('moment');
@Injectable()
export class CronRepository implements CronRepoInterface {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  async sendEmail() {
    try {
      let punishments = await this.neo4jService.findByLabelAndFilters(
        [Neo4jLabelEnum.PUNISHMENT],
        { isDeleted: false },
      );

      const mailSender = await this.configService.get('MAILER_USER');

      for (let index = 0; index < punishments.length; index++) {
        if (punishments[index].get('n').properties.count > 0) {
          const relatedUser = await this.neo4jService.getParentByIdAndFilters(
            punishments[index].get('n').identity.low,
            punishments[index].get('n').labels,
            { isDeleted: false },
            [Neo4jLabelEnum.USER],
            { isDeleted: false },
            RelationNameEnum.PARENT_OF,
            { isDeleted: false },
            1,
          );
          let text = `Sayın ${relatedUser.get('parent').properties.name} ${
            relatedUser.get('parent').properties.surname
          }  ofisimize ${
            punishments[index].get('n').properties.count
          }  kadar tatlı borcunuz bulunmaktadır.Saygılarımızla`;

          await this.mailerService.sendMail({
            to: relatedUser.get('parent').properties.email,
            from: mailSender,
            subject: 'Tatlı Borcunuz',
            text,
          });
          await this.neo4jService.updateByIdAndFilter(
            punishments[index].get('n').identity.low,
            punishments[index].get('n').labels,
            { isDeleted: false },
            [],
            {
              emailSendCount:
                punishments[index].get('n').properties.emailSendCount + 1,
            },
          );
        }
      }
      return 'success';
    } catch (error) {
      throw new Error(error);
    }
  }
}
