import { CacheModule, Global, Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { GlobalService } from './global.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60, // 1 hour
      isGlobal: true,
      shouldCloneBeforeSet: false,
      dispose: (connection: Connection) => {
        if (connection) {
          connection.close(); // when the connection is disposed, close the connection
        }
      },
    }),
  ],
  controllers: [],
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
