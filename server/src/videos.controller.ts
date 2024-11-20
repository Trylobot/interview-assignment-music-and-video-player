import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Video } from "./entity/Video"
import { Param } from '@nestjs/common'

@Controller('videos')
export class VideosController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(): Promise<Video[]> {
    return await this.appService.getVideos();
  }
  
  @Get(':videoId')
  async findOne( @Param('videoId') videoId: number): Promise<Video|null> {
    return await this.appService.getVideo(videoId);
  }

  // @Post()
  // create(): string {
  //   // creates a video
  //   return '';
  // }

}
