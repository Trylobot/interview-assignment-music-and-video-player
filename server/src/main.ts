import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"
import { Video } from "./entity/Video"


async function bootstrap() {
  
  // database
  AppDataSource.initialize().then(async () => {

      // database
      let videos = await AppDataSource.manager.find(Video);
      if (videos.length == 0) {
        // initialize Videos table with an example
        const ex = new Video();
        ex.name = '"Simple Made Easy" - Rich Hickey (2011)';
        ex.url = 'https://www.youtube.com/watch?v=SxdOUGdseq4';
        ex.createdAt = Math.floor(Date.now() / 1000);
        ex.updatedAt = ex.createdAt;
        await AppDataSource.manager.save( ex );
        console.log("Saved Video with id: " + ex.id );
        videos = await AppDataSource.manager.find(Video);
      }
      console.log("Loaded videos: ", videos)

      // webserver
      const app = await NestFactory.create(AppModule);
      app.enableCors(); // Enable CORS
      await app.listen(process.env.PORT ?? 3000);

  }).catch(error => console.log(error))

}
bootstrap();
