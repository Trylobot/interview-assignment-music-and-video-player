import { Injectable } from '@nestjs/common';
import { AppDataSource } from "./data-source"
import { Video } from "./entity/Video"


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
}
