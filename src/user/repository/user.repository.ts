import { HttpException, Injectable } from '@nestjs/common';
import { Neo4jService, assignDtoPropToEntity } from 'sgnm-neo4j';
import { UserInterface } from '../interface/user.interface';
import moment = require('moment');
import users from '../users.json';
import { User } from '../enities/user.entity';
import { ProcessEnum, PunishmentProcessorInput } from 'src/graphql/gql-types';
import { Neo4jLabelEnum } from 'src/common/const/neo4j.label.enum';
import { RelationNameEnum } from 'src/common/const/relation.name.enum';
@Injectable()
export class UserRepository implements UserInterface {
  /**
   * Inject Neo4jService 
   */
  constructor(private readonly neo4jService: Neo4jService) {}
  async getUserPunishment(email: any) {
    let user = await this.neo4jService.findChildrensByLabelsAndFilters(
      [Neo4jLabelEnum.USER],
      { isDeleted: false, email },
      [Neo4jLabelEnum.PUNISHMENT],
      { isDeleted: false },
      RelationNameEnum.PARENT_OF,
      { isDeleted: false },
      1,
    );

    let respone = {
      id: user[0].get('children').identity.low,
      labels: user[0].get('children').labels,
      properties: user[0].get('children').properties,
    };

    return respone;
  }
  async punishmentProcessor(
    punishmentProcessorInput: PunishmentProcessorInput,
  ) {
    try {
      const { email, count, proccesType } = punishmentProcessorInput;
      let user = await this.neo4jService.findByLabelAndFilters(
        [Neo4jLabelEnum.USER],
        {
          isDeleted: false,
          email,
        },
      );

      if (user.length) {
        const punishmentNode =
          await this.neo4jService.findChildrensByIdAndFilters(
            user[0].get('n').identity.low,
            user[0].get('n').labels,
            { isDeleted: false },
            [Neo4jLabelEnum.PUNISHMENT],
            { isDeleted: false },
            RelationNameEnum.PARENT_OF,
            { isDeleted: false },
            1,
          );
        switch (proccesType) {
          case ProcessEnum.Remove:
            await this.neo4jService.updateByIdAndFilter(
              punishmentNode[0].get('children').identity.low,
              punishmentNode[0].get('children').labels,
              { isDeleted: false },
              [],
              {
               
                emailSendCount:0,
                count:
                  punishmentNode[0].get('children').properties.count - count,
              },
            );
            break;
          default:
            const lastPunishmentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            await this.neo4jService.updateByIdAndFilter(
              punishmentNode[0].get('children').identity.low,
              punishmentNode[0].get('children').labels,
              { isDeleted: false },
              [],
              {
                lastPunishmentDate:lastPunishmentDate,
                updatedAt:moment().format('YYYY-MM-DD HH:mm:ss'),
                count:
                  punishmentNode[0].get('children').properties.count + count,
            
              },
            );
        }
      } else {
        throw new HttpException('user not exist', 400);
      }
      const response = {
        id: user[0].get('n').identity.low,
        labels: user[0].get('n').labels,
        properties: user[0].get('n').properties,
      };
      return response;
    } catch (error) {
      throw new Error (error);
    }
  }
  async getUser(email) {
    try {
      let user = await this.neo4jService.findByLabelAndFilters(
        [Neo4jLabelEnum.USER],
        {
          isDeleted: false,
          email,
        },
      );

      const response = {
        id: user[0].get('n').identity.low,
        labels: user[0].get('n').labels,
        properties: user[0].get('n').properties,
      };
      return response;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getUsers() {
    try {
      const users = (
        await this.neo4jService.findByLabelAndFilters([Neo4jLabelEnum.USER], {
          isDeleted: false,
        })
      ).map((user) => {
        const response = {
          id: user.get('n').identity.low,
          labels: user.get('n').labels,
          properties: user.get('n').properties,
        };
        return response;
      });

      return users;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUserFromJsonFile() {
    try {
      for (let index = 0; index < users.length; index++) {
        let user = await this.neo4jService.findByLabelAndFilters(
          [Neo4jLabelEnum.USER],
          {
            isDeleted: false,
            email: users[index]['email'],
          },
        );
        if (!user.length) {
          const userDto = {
            name: users[index]['name'],
            surname: users[index]['surname'],
            email: users[index]['email'],
          };
          const userEntity = new User();
          const userFinalObject = assignDtoPropToEntity(userEntity, userDto);
          let user = await this.neo4jService.createNode(userFinalObject, [
            Neo4jLabelEnum.USER,
          ]);
          const punishmentDto = {
            count: 0,
            emailSendCount: 0,
            name: users[index]['name'] + Neo4jLabelEnum.PUNISHMENT,
          };
          const punishmentEntity = new User();
          const punishmentFinalObject = assignDtoPropToEntity(
            punishmentEntity,
            punishmentDto,
          );
          let punishmentNode = await this.neo4jService.createNode(
            punishmentFinalObject,
            [Neo4jLabelEnum.PUNISHMENT],
          );

          await this.neo4jService.addRelationByIdWithRelationNameAndFilters(
            user.identity.low,
            user.labels,
            { isDeleted: false },
            punishmentNode.identity.low,
            punishmentNode.labels,
            { isDeleted: false },
            RelationNameEnum.PARENT_OF,
            { isDeleted: false },
          );
        }
      }

      return 'success';
    } catch (error) {
      throw new Error(error);
    }
  }
}
