import { Injectable } from '@nestjs/common';
import { AppDataSource } from "./data-source"
import { Video } from "./entity/Video"
import { DeepPartial } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getVideos(): Promise<Video[]> {
    return await AppDataSource.manager.find( Video );
  }

  async getVideo( id:number ): Promise<Video|null> {
    return await AppDataSource.manager.findOneBy( Video, { id })
  }

  async createVideo(data: DeepPartial<Video>): Promise<Video> {
    const video = AppDataSource.manager.create(Video, data);
    return await AppDataSource.manager.save(video);
  }

  async updateVideo(id: number, data: DeepPartial<Video>): Promise<Video | null> {
    const video = await this.getVideo(id);
    if (!video) {
      return null;
    }
    AppDataSource.manager.merge(Video, video, data);
    return await AppDataSource.manager.save(video);
  }

  async deleteVideo(id: number): Promise<boolean> {
    const result = await AppDataSource.manager.delete(Video, id);
    return result.affected !== 0;
  }  
}
