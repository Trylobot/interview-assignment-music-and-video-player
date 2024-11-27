import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Video } from "./entity/Video"


export class UpdateVideoDto {
  name: string;
  url: string;
  updatedAt: number = Math.floor(Date.now() / 1000);
  createdAt: number = Math.floor(Date.now() / 1000);
}

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

  @Post()
  async create(@Body() v: UpdateVideoDto): Promise<Video> {
    return await this.appService.createVideo( v );
  }

  @Put(':videoId')
  async update(
    @Param('videoId') videoId: number,
    @Body() v: UpdateVideoDto,
  ): Promise<Video | null> {
    return await this.appService.updateVideo(videoId, v );
  }

  @Delete(':videoId')
  async delete(@Param('videoId') videoId: number): Promise<boolean> {
    return await this.appService.deleteVideo(videoId);
  }
}
