import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  serveApp(@Req() req: Request, @Res() res: Response) {
    res.sendFile(join(process.cwd(),'frontend','build','index.html'));
  }
  
}
