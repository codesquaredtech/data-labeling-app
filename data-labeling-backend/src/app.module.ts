import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://vlado:123@cluster0.rc3wc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"),
    ProjectModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,AuthStrategy],
})
export class AppModule {}
