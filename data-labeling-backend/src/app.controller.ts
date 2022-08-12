import { Controller, Get, Req, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './auth/firebase.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('/hello')
  getHello(@Req() request: Request): string {
    return 'Hello ' + JSON.stringify(request['user']) + '1';
  }
}
