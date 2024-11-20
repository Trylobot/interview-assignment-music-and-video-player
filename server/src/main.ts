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
        // initialize Videos table with a couple of examples
        
        const ex1 = new Video();
        ex1.name = '"Simple Made Easy" - Rich Hickey (2011)';
        ex1.url = 'https://www.youtube.com/watch?v=SxdOUGdseq4';
        ex1.createdAt = Math.floor(Date.now() / 1000);
        ex1.updatedAt = ex1.createdAt;
        await AppDataSource.manager.save( ex1 );
        
        const ex2 = new Video();
        ex2.name = '† Carpenter Brut † TURBO KILLER † Directed by Seth Ickerman † Official Video †';
        ex2.url = 'https://www.youtube.com/watch?v=er416Ad3R1g';
        ex2.createdAt = Math.floor(Date.now() / 1000);
        ex2.updatedAt = ex2.createdAt;
        await AppDataSource.manager.save( ex2 );
        
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
