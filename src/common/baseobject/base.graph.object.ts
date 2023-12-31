import moment = require('moment');
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseGraphObject {
  key: string = generateUuid();
  createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
  description = '';
  isActive = true;
  canDisplay: boolean = true;
  isDeleted = false;
  canDelete = true;
  name: string;
  tag: string[] = [];
}

function generateUuid() {
  return uuidv4();
}
