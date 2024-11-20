import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VideosController } from './videos.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,VideosController],
  providers: [AppService],
})
export class AppModule {}
