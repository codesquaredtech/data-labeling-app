import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class GlobalService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createConnection(projectId: string) {
    const newConnection = mongoose.createConnection(
      `mongodb+srv://luka:mu0YV2Xh2WiY4xdi@cluster0.vgobtyd.mongodb.net/resources_${projectId}?retryWrites=true&w=majority`,
    );
    await this.cacheManager.set(projectId, newConnection);
    return newConnection;
  }

  async getConnection(projectId: string) {
    const connection: Connection = await this.cacheManager.get(projectId);
    if (!connection) {
      return this.createConnection(projectId);
    }
    return connection;
  }
}
