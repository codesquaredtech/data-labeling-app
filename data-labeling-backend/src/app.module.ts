import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthStrategy } from './auth/auth.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { ResourceModule } from './resource/resource.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://luka:mu0YV2Xh2WiY4xdi@cluster0.vgobtyd.mongodb.net/?retryWrites=true&w=majority',
    ),
    ProjectModule,
    UserModule,
    ResourceModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
