import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class GlobalService {
  private dbConnection: Connection = null;

  setConnection(connection: Connection) {
    this.dbConnection = connection;
  }

  getConnection() {
    return this.dbConnection;
  }
}
