import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Video } from "./entity/Video"

@Controller('videos')
export class VideosController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return await this.appService.getVideos();
  }
  
  // @Post()
  // create(): string {
  //   // creates a video
  //   return '';
  // }

}
