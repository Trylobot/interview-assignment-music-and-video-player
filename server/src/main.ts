import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"
import { Video } from "./entity/Video"


async function bootstrap() {
  
  // database
  AppDataSource.initialize().then(async () => {

      // console.log("Inserting a new user into the database...")
      // const user = new User()
      // user.firstName = "Timber"
      // user.lastName = "Saw"
      // user.age = 25
      // await AppDataSource.manager.save(user)
      // console.log("Saved a new user with id: " + user.id)

      // console.log("Loading users from the database...")
      // const users = await AppDataSource.manager.find(User)
      // console.log("Loaded users: ", users)

      // database
      const videos = await AppDataSource.manager.find(Video)
      console.log("Loaded videos: ", videos)

      // webserver
      const app = await NestFactory.create(AppModule);
      await app.listen(process.env.PORT ?? 3000);

  }).catch(error => console.log(error))

}
bootstrap();
